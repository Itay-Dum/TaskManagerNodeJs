import sys
from os.path import dirname, basename

if __package__ is None:
    sys.path.append('..')
    __package__ = basename(dirname(sys.argv[0]))