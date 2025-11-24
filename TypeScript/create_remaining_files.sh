#!/bin/bash
# This script will help track which files we've created
echo "Files created so far:"
ls -1 src/*.ts | grep -v test
echo ""
echo "Total files: $(ls -1 src/*.ts | grep -v test | wc -l)"
