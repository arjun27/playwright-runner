# 🎭 End-to-end tests with Playwright [![npm version](https://img.shields.io/npm/v/@playwright/test.svg?style=flat)](https://www.npmjs.com/package/@playwright/test)

🚧 This project is under active development and is not ready for serious use.

Zero config cross-browser end-to-end testing for web apps. Browser automation with [Playwright](https://playwright.dev), Jest-like assertions and support for TypeScript.

- [Get started](#get-started)
  - [Installation](#installation)
  - [Write a test](#write-a-test)
  - [Run the test](#run-the-test)
- [Examples](#examples)
  - [Multiple pages](#multiple-pages)
  - [Network mocking](#network-mocking)
  - [Mobile emulation](#mobile-emulation)
- Customize your suite
  - Annotations
  - Parameters
  - Fixtures
  - Parallel execution
  - Retries

## Get started

### Installation

```sh
npm i -D @playwright/test
```

### Write a test

Create `foo.spec.ts` to define your test. The test function uses the [`page`](https://playwright.dev/#path=docs%2Fapi.md&q=class-page) argument for browser automation.

```js
import { it, expect } from '@playwright/test';

it('is a basic test with the page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.home-navigation');
  expect(name).toBe('🎭 Playwright');
});
```

#### Default arguments

The test runner provides browser primitives as arguments to your test functions. Tests can use one or more of these primitives.

- `page`: Instance of [Page](https://playwright.dev/#path=docs%2Fapi.md&q=class-page). Each test gets a new isolated page to run the test.
- `context`: Instance of [BrowserContext][browser-context]. Each test gets a new isolated context to run the test. The `page` object belongs to this context.
- `browser`: Instance of [Browser](https://playwright.dev/#path=docs%2Fapi.md&q=class-browser). Browsers are shared across tests to optimize resources. Each worker process gets a browser instance.

Use [test fixtures](docs/fixtures.md) to customize or create new function arguments.

#### Specs and assertions

Use `it` and `describe` to write test functions.

```js
const { it, describe } = require('@playwright/test');

describe('feature foo', () => {
  it('is working correctly', async ({ page }) => {
    // Test function
  })
});
```

To run a single test use `fit` or `it.only`. To skip a test use `xit` or `it.skip`. Use [test annotations](docs/annotations.md) to mark tests as slow, flaky or fixme.

The test runner provides the [expect](https://www.npmjs.com/package/expect) package for assertions. See [expect API reference](https://jestjs.io/docs/en/expect).

### Run the test

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures.

```sh
# Run all tests across Chromium, Firefox and WebKit
npx folio

# Run tests on a single browser
npx folio --param browserName=chromium

# Run all tests in headful mode
npx folio --param headful

# Save screenshots on failure in test-results directory
npx folio --param screenshotOnFailure

# See all options
npx folio --help
```

Test runner CLI can be customized with [test parameters](docs/parameters.md).

#### Configure NPM scripts

Save the run command as an NPM script.

```json
{
  "scripts": {
    "test": "npx folio --param screenshotOnFailure"
  }
}
```

-----------

## Examples

### Multiple pages

The `context` argument is an instance of [BrowserContext][browser-context]. Browser contexts are isolated execution environments that can host multiple pages.

```js
const { it } = require('@playwright/test');

it('tests on multiple web pages', async ({ context }) => {
  const pageFoo = await context.newPage();
  const pageBar = await context.newPage();
  // Test function code
});
```

See [multi-page scenarios][multi-page] for more examples.

### Network mocking

Define a custom argument that mocks networks call for a browser context.

```js
const { it, fixtures } = require('@playwright/test');

fixtures.mockedContext.init(async ({ context }, runTest) => {
  context.route(/.css/, route => route.abort());
  runTest(context);
});

it('loads pages without css requests', async ({ mockedContext }) => {
  const page = await mockedContext.newPage();
  await page.goto('https://stackoverflow.com');
  // Test function code
});
```

### Mobile emulation

Override default options for creating a BrowserContext to use mobile emulation.

```js
const { it, fixtures } = require('@playwright/test');
const { devices } = require('playwright');

fixtures.defaultContextOptions.override(async ({}, runTest) => {
  await runTest({ ...devices['iPhone 11'] });
});

it('uses mobile emulation', async ({ context }) => {
  // Test function code
});
```

[browser-opts]: https://playwright.dev/#path=docs%2Fapi.md&q=browsertypelaunchoptions
[context-opts]: https://playwright.dev/#path=docs%2Fapi.md&q=browsernewcontextoptions
[multi-page]: https://playwright.dev/#path=docs%2Fmulti-pages.md&q=
