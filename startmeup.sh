#!/bin/bash

BASEDIR=$(dirname $0)

if [ -d "$1" ]; then
  rsync -rv --exclude=.git $BASEDIR $1
  echo '** Dotfiles copied **'
else
  echo 'The destination directory is not found.'
fi
