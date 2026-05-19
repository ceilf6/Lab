## Supported Platforms

Check the [SUPPORTED_PLATFORMS file](SUPPORTED_PLATFORMS.md).

### `-fno-strict-aliasing`

It is recommended to turn on the `-fno-strict-aliasing` compiler flag in
projects that use libuv. The use of ad hoc "inheritance" in the libuv API
may not be safe in the presence of compiler optimizations that depend on
strict aliasing.

MSVC does not have an equivalent flag but it also does not appear to need it
at the time of writing (December 2019.)

### AIX Notes

AIX compilation using IBM XL C/C++ requires version 12.1 or greater.

AIX support for filesystem events requires the non-default IBM `bos.ahafs`
package to be installed.  This package provides the AIX Event Infrastructure
that is detected by `autoconf`.
[IBM documentation](http://www.ibm.com/developerworks/aix/library/au-aix_event_infrastructure/)
describes the package in more detail.

### z/OS Notes

z/OS compilation requires [ZOSLIB](https://github.com/ibmruntimes/zoslib) to be installed. When building with [CMake][], use the flag `-DZOSLIB_DIR` to specify the path to [ZOSLIB](https://github.com/ibmruntimes/zoslib):

```bash
$ (cd build && cmake .. -DBUILD_TESTING=ON -DZOSLIB_DIR=/path/to/zoslib)
$ cmake --build build
```

z/OS creates System V semaphores and message queues. These persist on the system
after the process terminates unless the event loop is closed.

Use the `ipcrm` command to manually clear up System V resources.

## Patches

See the [guidelines for contributing][].

[CMake]: https://cmake.org/
[node.js]: http://nodejs.org/
[guidelines for contributing]: https://github.com/libuv/libuv/blob/master/CONTRIBUTING.md
[libuv_banner]: https://raw.githubusercontent.com/libuv/libuv/master/img/banner.png
[Visual C++ Build Tools]: https://visualstudio.microsoft.com/visual-cpp-build-tools/
[Visual Studio 2015 Update 3]: https://www.visualstudio.com/vs/older-downloads/
[Visual Studio 2017]: https://www.visualstudio.com/downloads/
[Git for Windows]: http://git-scm.com/download/win