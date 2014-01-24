# zther-lib

Javascript util library.  Port of Casalib library for AS3

## About

A JavaScript library by Zther.

See the [project homepage](http://.github.io/zther-lib).

## Installation

Using Bower:

    bower install zther-lib

Or grab the [source](https://github.com//zther-lib/dist/zther-lib.js) ([minified](https://github.com//zther-lib/dist/zther-lib.min.js)).

## Usage

Basic usage is as follows:

    var size = {width:10, height: 10 };
    var ratio = zther.utils.RatioUtil.heightToWidth(size);

    console.log(ratio);  // returns 1

For advanced usage, see the documentation.

## Building

	npm install

	grunt

## Releasing

This will create a compressed version of the files.

	grunt release

## Testing

Make sure you've installed node modules first.

	grunt test

## Documentation

Start with `docs/MAIN.md`.

## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

Some steps to follow:

- Create your class following the namespace conventions.
- Add the class to the concat task
- Add your unit tests
- Run grunt

## License

MIT. See `LICENSE.txt` in this directory.
