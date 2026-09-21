#!/usr/bin/env python3
"""
Recursively upload LOCAL_PATH to REMOTE_PATH over pure SFTP (paramiko),
never opening an SSH exec/shell channel. Network Solutions' SFTP
accounts are chrooted to SFTP-only — any GitHub Action that shells out
a command (e.g. `mkdir -p` via SSH exec) to pre-create directories gets
rejected outright ("exec request failed on channel 0"). Directories
here are created via SFTP's own MKDIR operation instead, which the
account does allow.

Required env vars: SFTP_HOST, SFTP_USERNAME, SFTP_PASSWORD, REMOTE_PATH.
Optional: SFTP_PORT (default 22), LOCAL_PATH (default "dist").
"""

import os
import sys

import paramiko

HOST = os.environ["SFTP_HOST"]
PORT = int(os.environ.get("SFTP_PORT", "22"))
USERNAME = os.environ["SFTP_USERNAME"]
PASSWORD = os.environ["SFTP_PASSWORD"]
LOCAL_ROOT = os.environ.get("LOCAL_PATH", "dist")
REMOTE_ROOT = "/" + os.environ["REMOTE_PATH"].strip("./ ").rstrip("/")


def remote_mkdir_p(sftp, path):
    parts = [p for p in path.strip("/").split("/") if p]
    cur = ""
    for part in parts:
        cur += "/" + part
        try:
            sftp.stat(cur)
        except FileNotFoundError:
            sftp.mkdir(cur)
            print(f"  created directory {cur}")


def upload_dir(sftp, local_dir, remote_dir, counts):
    remote_mkdir_p(sftp, remote_dir)
    for entry in sorted(os.listdir(local_dir)):
        local_path = os.path.join(local_dir, entry)
        remote_path = remote_dir.rstrip("/") + "/" + entry
        if os.path.isdir(local_path):
            upload_dir(sftp, local_path, remote_path, counts)
        else:
            sftp.put(local_path, remote_path)
            counts["files"] += 1
            counts["bytes"] += os.path.getsize(local_path)


def main():
    if not os.path.isdir(LOCAL_ROOT):
        print(f"Local path '{LOCAL_ROOT}' does not exist or is not a directory.", file=sys.stderr)
        sys.exit(1)

    print(f"Connecting to {HOST}:{PORT} as {USERNAME}...")
    transport = paramiko.Transport((HOST, PORT))
    try:
        transport.connect(username=USERNAME, password=PASSWORD)
        sftp = paramiko.SFTPClient.from_transport(transport)
        print(f"Uploading {LOCAL_ROOT}/ -> {REMOTE_ROOT}/ ...")
        counts = {"files": 0, "bytes": 0}
        upload_dir(sftp, LOCAL_ROOT, REMOTE_ROOT, counts)
        sftp.close()
    finally:
        transport.close()

    mb = counts["bytes"] / (1024 * 1024)
    print(f"Done — uploaded {counts['files']} files ({mb:.1f} MB) to {REMOTE_ROOT}/")


if __name__ == "__main__":
    main()
