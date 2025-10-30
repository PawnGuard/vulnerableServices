#!/usr/bin/env python3

import argparse
import subprocess
import os

def get_arguments():
    argparser = argparse.ArgumentParser("You can run any command as the owner of this program. ^o^")
    argparser.add_argument("-c", "--command", required=True, help="Use -c/--command flag to execute a command as the owner. (Ex: ./program -c 'whoami')", dest="command")
    args = argparser.parse_args()
    return args.command

def run_command(command):
    os.setuid(1005)
    return os.system(command)


def main():
    command = get_arguments()
    result = run_command(command)
    stdout_colored = result
    s = "shell@user$"
    print(f"{s}\n\t{stdout_colored}")

if __name__ == "__main__":
    main()
