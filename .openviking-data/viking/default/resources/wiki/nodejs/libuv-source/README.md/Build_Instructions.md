## Build Instructions

For UNIX-like platforms, including macOS, there are two build methods:
autotools or [CMake][].

For Windows, [CMake][] is the only supported build method and has the
following prerequisites:

<details>

* One of:
  * [Visual C++ Build Tools][]
  * [Visual Studio 2015 Update 3][], all editions
    including the Community edition (remember to select
    "Common Tools for Visual C++ 2015" feature during installation).
  * [Visual Studio 2017][], any edition (including the Build Tools SKU).
    **Required Components:** "MSbuild", "VC++ 2017 v141 toolset" and one of the
    Windows SDKs (10 or 8.1).
* Basic Unix tools required for some tests,
  [Git for Windows][] includes Git Bash
  and tools which can be included in the global `PATH`.

</details>

To build with autotools:

```bash
$ sh autogen.sh
$ ./configure
$ make
$ make check
$ make install
```

To build with [CMake][]:

```bash
$ cmake -B build -DBUILD_TESTING=ON         # generate project with tests
$ cmake --build build                       # add `-j <n>` with cmake >= 3.12

# Run tests:
$ (cd build && ctest -C Debug --output-on-failure)

# Or manually run tests:
$ build/uv_run_tests                        # shared library build
$ build/uv_run_tests_a                      # static library build
```

To cross-compile with [CMake][] (unsupported but generally works):

```bash
$ cmake ../..                 \
  -DCMAKE_SYSTEM_NAME=Windows \
  -DCMAKE_SYSTEM_VERSION=6.1  \
  -DCMAKE_C_COMPILER=i686-w64-mingw32-gcc
```

### Install with Homebrew

```bash
$ brew install --HEAD libuv
```

Note to macOS users:

Make sure that you specify the architecture you wish to build for in the
"ARCHS" flag. You can specify more than one by delimiting with a space
(e.g. "x86_64 i386").

### Install with vcpkg

```bash
$ git clone https://github.com/microsoft/vcpkg.git
$ ./bootstrap-vcpkg.bat # for powershell
$ ./bootstrap-vcpkg.sh # for bash
$ ./vcpkg install libuv
```

### Install with Conan

You can install pre-built binaries for libuv or build it from source using [Conan](https://conan.io/). Use the following command:

```bash
conan install --requires="libuv/[*]" --build=missing
```

The libuv Conan recipe is kept up to date by Conan maintainers and community contributors.
If the version is out of date, please [create an issue or pull request](https://github.com/conan-io/conan-center-index) on the ConanCenterIndex repository.


### Running tests

Some tests are timing sensitive. Relaxing test timeouts may be necessary
on slow or overloaded machines:

```bash
$ env UV_TEST_TIMEOUT_MULTIPLIER=2 build/uv_run_tests # 10s instead of 5s
```

#### Run one test

The list of all tests is in `test/test-list.h`.

This invocation will cause the test driver to fork and execute `TEST_NAME` in
a child process:

```bash
$ build/uv_run_tests_a TEST_NAME
```

This invocation will cause the test driver to execute the test in
the same process:

```bash
$ build/uv_run_tests_a TEST_NAME TEST_NAME
```

#### Debugging tools

When running the test from within the test driver process
(`build/uv_run_tests_a TEST_NAME TEST_NAME`), tools like gdb and valgrind
work normally.

When running the test from a child of the test driver process
(`build/uv_run_tests_a TEST_NAME`), use these tools in a fork-aware manner.

##### Fork-aware gdb

Use the [follow-fork-mode](https://sourceware.org/gdb/onlinedocs/gdb/Forks.html) setting:

```
$ gdb --args build/uv_run_tests_a TEST_NAME

(gdb) set follow-fork-mode child
...
```

##### Fork-aware valgrind

Use the `--trace-children=yes` parameter:

```bash
$ valgrind --trace-children=yes -v --tool=memcheck --leak-check=full --track-origins=yes --leak-resolution=high --show-reachable=yes --log-file=memcheck-%p.log build/uv_run_tests_a TEST_NAME
```

### Running benchmarks

See the section on running tests.
The benchmark driver is `./uv_run_benchmarks_a` and the benchmarks are
listed in `test/benchmark-list.h`.