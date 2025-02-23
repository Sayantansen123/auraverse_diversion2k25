import os

def capture_command_output(command):
    stream = os.popen(command)
    output = stream.read().strip()
    return output
s=capture_command_output("net accounts")

#print("stored value is ", s)

