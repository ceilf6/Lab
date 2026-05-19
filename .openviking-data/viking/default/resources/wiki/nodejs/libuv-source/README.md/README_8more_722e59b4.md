![libuv][libuv_banner]

## Overview

libuv is a multi-platform support library with a focus on asynchronous I/O. It
was primarily developed for use by [Node.js][], but it's also
used by [Luvit](http://luvit.io/), [Julia](http://julialang.org/),
[uvloop](https://github.com/MagicStack/uvloop), and [others](https://github.com/libuv/libuv/blob/v1.x/LINKS.md).

## Feature highlights

* Full-featured event loop backed by epoll, kqueue, IOCP, event ports.

 * Asynchronous TCP and UDP sockets

 * Asynchronous DNS resolution

 * Asynchronous file and file system operations

 * File system events

 * ANSI escape code controlled TTY

 * IPC with socket sharing, using Unix domain sockets or named pipes (Windows)

 * Child processes

 * Thread pool

 * Signal handling

 * High resolution clock

 * Threading and synchronization primitives

## Versioning

Starting with version 1.0.0 libuv follows the [semantic versioning](http://semver.org/)
scheme. The API change and backwards compatibility rules are those indicated by
SemVer. libuv will keep a stable ABI across major releases.

The ABI/API changes can be tracked [here](http://abi-laboratory.pro/tracker/timeline/libuv/).

## Licensing

libuv is licensed under the MIT license. Check the [LICENSE](LICENSE) and
[LICENSE-extra](LICENSE-extra) files.

The documentation is licensed under the CC BY 4.0 license. Check the
[LICENSE-docs file](LICENSE-docs).

## Community

* [Support](https://github.com/libuv/libuv/discussions)
 * [Mailing list](http://groups.google.com/group/libuv)

## Documentation

### Official documentation

Located in the docs/ subdirectory. It uses the [Sphinx](http://sphinx-doc.org/)
framework, which makes it possible to build the documentation in multiple
formats.

Show different supported building options:

```bash
$ make help
```

Build documentation as HTML:

```bash
$ make html
```

Build documentation as HTML and live reload it when it changes (this requires
sphinx-autobuild to be installed and is only supported on Unix):

```bash
$ make livehtml
```

Build documentation as man pages:

```bash
$ make man
```

Build documentation as ePub:

```bash
$ make epub
```

NOTE: Windows users need to use make.bat instead of plain 'make'.

Documentation can be browsed online [here](http://docs.libuv.org).

The [tests and benchmarks](https://github.com/libuv/libuv/tree/master/test)
also serve as API specification and usage examples.

### Other resources

 * [LXJS 2012 talk](http://www.youtube.com/watch?v=nGn60vDSxQ4)
   &mdash; High-level introductory talk about libuv.
 * [libuv-dox](https://github.com/thlorenz/libuv-dox)
   &mdash; Documenting types and methods of libuv, mostly by reading uv.h.
 * [learnuv](https://github.com/thlorenz/learnuv)
   &mdash; Learn uv for fun and profit, a self guided workshop to libuv.

These resources are not handled by libuv maintainers and might be out of
date. Please verify it before opening new issues.

## Downloading

libuv can be downloaded either from the
[GitHub repository](https://github.com/libuv/libuv)
or from the [downloads site](http://dist.libuv.org/dist/).

Before verifying the git tags or signature files, importing the relevant keys
is necessary. Key IDs are listed in the
[MAINTAINERS](https://github.com/libuv/libuv/blob/master/MAINTAINERS.md)
file, but are also available as git blob objects for easier use.

Importing a key the usual way:

```bash
$ gpg --keyserver pool.sks-keyservers.net --recv-keys AE9BC059
```

Importing a key from a git blob object:

```bash
$ git show pubkey-saghul | gpg --import
```

### Verifying releases

Git tags are signed with the developer's key, they can be verified as follows:

```bash
$ git verify-tag v1.6.1
```

Starting with libuv 1.7.0, the tarballs stored in the
[downloads site](http://dist.libuv.org/dist/) are signed and an accompanying
signature file sit alongside each. Once both the release tarball and the
signature file are downloaded, the file can be verified as follows:

```bash
$ gpg --verify libuv-1.7.0.tar.gz.sign
```