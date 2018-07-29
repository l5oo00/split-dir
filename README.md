# split-dir

将大文件夹分割为多个小文件夹

```bash
$ node bin/split-dir -h

  Usage: split-dir [options] <dir ...>

  Options:

    -v --version                          output the version number
    -s --sub_dir_prefix <sub_dir_prefix>  拆分后生成得子文件夹名前缀，默认为： package
    -c --file_count <n>                   单个文件夹内最大文件数，默认为： 500
    -h, --help                            output usage information
```