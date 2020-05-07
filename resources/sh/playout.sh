#!/bin/bash

input=$1

if [[ "$input" == "start" ]]; then
    sudo /bin/systemctl start ffplayout-engine
elif [[ "$input" == "stop" ]]; then
    sudo /bin/systemctl stop ffplayout-engine
fi
