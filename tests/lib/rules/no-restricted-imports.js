/**
 * @fileoverview Tests for no-restricted-imports.
 * @author Guy Ellis
 * @copyright 2015 Guy Ellis. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-restricted-imports"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-restricted-imports", rule, {
    valid: [
        { code: "import os from \"os\";", options: ["osx"], parserOptions: { sourceType: "module" } },
        { code: "import fs from \"fs\";", options: ["crypto"], parserOptions: { sourceType: "module" } },
        { code: "import path from \"path\";", options: ["crypto", "stream", "os"], parserOptions: { sourceType: "module" } },
        { code: "import async from \"async\";", parserOptions: { sourceType: "module" } },
        { code: "import \"foo\"", options: ["crypto"], parserOptions: { sourceType: "module" } }
    ],
    invalid: [{
        code: "import \"fs\"", options: ["fs"], parserOptions: { sourceType: "module" },
        errors: [{ message: "'fs' import is restricted from being used.", type: "ImportDeclaration"}]
    }, {
        code: "import os from \"os \";", options: ["fs", "crypto ", "stream", "os"], parserOptions: { sourceType: "module" },
        errors: [{ message: "'os' import is restricted from being used.", type: "ImportDeclaration"}]
    }]
});
