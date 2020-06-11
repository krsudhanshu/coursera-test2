from PIL import Image
import os
import sys

path = '/home/sudhanshu/coursera-test2/mock_site/images/anime//'
dirs = os.listdir(path)


def resize():
    for item in dirs:
        if os.path.isfile(path + item):
            im = Image.open(path + item)
            f, e = os.path.splitext(path + item)
            imResize = im.resize((300, 300), Image.ANTIALIAS)
            imResize.save(f + '.jpg', 'JPEG', quality=90)


resize()
