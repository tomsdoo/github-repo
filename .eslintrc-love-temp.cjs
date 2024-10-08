// renaming standard-with-typescript -> eslint-config-love

// https://github.com/mightyiam/eslint-config-love/blob/dfc2524e67dfcfd453e5776d5687f4c15ddea31e/src/index.ts#L1
// until flag config goes live

// eslint-plugin-n v17 is not supported by current eslint-config-love
// https://github.com/mightyiam/eslint-config-love/pull/1506

const rules = {
  '@typescript-eslint/adjacent-overload-signatures': ['error'],
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  '@typescript-eslint/await-thenable': ['error'],
  '@typescript-eslint/ban-ts-comment': ['error', {
    'ts-expect-error': 'allow-with-description',
    'ts-ignore': true,
    'ts-nocheck': true,
    'ts-check': false,
    minimumDescriptionLength: 3
  }],
  '@typescript-eslint/ban-tslint-comment': ['error'],
  '@typescript-eslint/no-empty-object-type': 'error',
  '@typescript-eslint/no-unsafe-function-type': 'error',
  '@typescript-eslint/no-wrapper-object-types': 'error',
  '@typescript-eslint/block-spacing': ['error', 'always'],
  '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
  '@typescript-eslint/comma-dangle': ['error', {
    arrays: 'never',
    objects: 'never',
    imports: 'never',
    exports: 'never',
    functions: 'never',
    enums: 'ignore',
    generics: 'ignore',
    tuples: 'ignore'
  }],
  '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
  '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
  '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never'
    }
  ],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-exports': ['error', {
    fixMixedExportsWithInlineTypeSpecifier: true
  }],
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    disallowTypeAnnotations: true,
    fixStyle: 'inline-type-imports'
  }],
  '@typescript-eslint/dot-notation': ['error',
    {
      allowIndexSignaturePropertyAccess: false,
      allowKeywords: true,
      allowPattern: '',
      allowPrivateClassPropertyAccess: false,
      allowProtectedClassPropertyAccess: false
    }
  ],
  '@typescript-eslint/explicit-function-return-type': ['error', {
    allowExpressions: true,
    allowHigherOrderFunctions: true,
    allowTypedFunctionExpressions: true,
    allowDirectConstAssertionInArrowFunctions: true
  }],
  '@typescript-eslint/func-call-spacing': ['error', 'never'],
  '@typescript-eslint/indent': ['error', 2, {
    SwitchCase: 1,
    VariableDeclarator: 1,
    outerIIFEBody: 1,
    MemberExpression: 1,
    FunctionDeclaration: { parameters: 1, body: 1 },
    FunctionExpression: { parameters: 1, body: 1 },
    CallExpression: { arguments: 1 },
    ArrayExpression: 1,
    ObjectExpression: 1,
    ImportDeclaration: 1,
    flatTernaryExpressions: false,
    ignoreComments: false,
    ignoredNodes: [
      'TemplateLiteral *',
      'JSXElement',
      'JSXElement > *',
      'JSXAttribute',
      'JSXIdentifier',
      'JSXNamespacedName',
      'JSXMemberExpression',
      'JSXSpreadAttribute',
      'JSXExpressionContainer',
      'JSXOpeningElement',
      'JSXClosingElement',
      'JSXFragment',
      'JSXOpeningFragment',
      'JSXClosingFragment',
      'JSXText',
      'JSXEmptyExpression',
      'JSXSpreadChild'
    ],
    offsetTernaryExpressions: true
  }],
  '@typescript-eslint/key-spacing': ['error', { beforeColon: false, afterColon: true }],
  '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: { delimiter: 'none' },
      singleline: { delimiter: 'comma', requireLast: false }
    }
  ],
  '@typescript-eslint/method-signature-style': ['error'],
  '@typescript-eslint/naming-convention': ['error', {
    selector: 'variableLike',
    leadingUnderscore: 'allow',
    trailingUnderscore: 'allow',
    format: ['camelCase', 'PascalCase', 'UPPER_CASE']
  }],
  '@typescript-eslint/no-array-constructor': ['error'],
  '@typescript-eslint/no-base-to-string': ['error'],
  '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: false, ignoreVoidOperator: false }],
  '@typescript-eslint/no-dupe-class-members': ['error'],
  '@typescript-eslint/no-dynamic-delete': ['error'],
  '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
  '@typescript-eslint/no-extra-non-null-assertion': ['error'],
  '@typescript-eslint/no-extra-parens': ['error', 'functions'],
  '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
  '@typescript-eslint/no-floating-promises': ['error'],
  '@typescript-eslint/no-for-in-array': ['error'],
  '@typescript-eslint/no-implied-eval': ['error'],
  '@typescript-eslint/no-invalid-void-type': ['error'],
  '@typescript-eslint/no-loss-of-precision': ['error'],
  '@typescript-eslint/no-misused-new': ['error'],
  '@typescript-eslint/no-misused-promises': ['error'],
  '@typescript-eslint/no-namespace': ['error'],
  '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
  '@typescript-eslint/no-non-null-assertion': ['error'],
  '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
  '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
  '@typescript-eslint/only-throw-error': ['error'],
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
  '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
  '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
  '@typescript-eslint/no-unsafe-argument': ['error'],
  '@typescript-eslint/no-unused-expressions': ['error', {
    allowShortCircuit: true,
    allowTernary: true,
    allowTaggedTemplates: true,
    enforceForJSX: false
  }],
  '@typescript-eslint/no-unused-vars': ['error', {
    args: 'none',
    caughtErrors: 'none',
    ignoreRestSiblings: true,
    vars: 'all'
  }],
  '@typescript-eslint/no-use-before-define': ['error', {
    functions: false,
    classes: false,
    enums: false,
    variables: false,
    typedefs: false
  }],
  '@typescript-eslint/no-useless-constructor': ['error'],
  '@typescript-eslint/no-var-requires': ['error'],
  '@typescript-eslint/non-nullable-type-assertion-style': ['error'],
  '@typescript-eslint/object-curly-spacing': ['error', 'always'],
  '@typescript-eslint/prefer-function-type': ['error'],
  '@typescript-eslint/prefer-includes': ['error'],
  '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false }],
  '@typescript-eslint/prefer-optional-chain': ['error'],
  '@typescript-eslint/prefer-promise-reject-errors': ['error'],
  '@typescript-eslint/prefer-readonly': ['error'],
  '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
  '@typescript-eslint/prefer-return-this-type': ['error'],
  '@typescript-eslint/prefer-ts-expect-error': ['error'],
  '@typescript-eslint/promise-function-async': ['error'],
  '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: false }],
  '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
  '@typescript-eslint/return-await': ['error', 'always'],
  '@typescript-eslint/semi': ['error', 'never'],
  '@typescript-eslint/space-before-blocks': ['error', 'always'],
  '@typescript-eslint/space-before-function-paren': ['error', 'always'],
  '@typescript-eslint/space-infix-ops': ['error'],
  '@typescript-eslint/strict-boolean-expressions': ['error', {
    allowString: false,
    allowNumber: false,
    allowNullableObject: false,
    allowNullableBoolean: false,
    allowNullableString: false,
    allowNullableNumber: false,
    allowAny: false
  }],
  '@typescript-eslint/triple-slash-reference': ['error', { lib: 'never', path: 'never', types: 'never' }],
  '@typescript-eslint/type-annotation-spacing': ['error'],
  '@typescript-eslint/unbound-method': ['error', { ignoreStatic: false }],

  'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: false, enforceForClassMembers: true }],
  'array-bracket-spacing': ['error', 'never'],
  'array-callback-return': ['error', {
    allowImplicit: false,
    allowVoid: false,
    checkForEach: false
  }],
  'arrow-spacing': ['error', { before: true, after: true }],
  'comma-style': ['error', 'last'],
  'computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
  'constructor-super': ['error'],
  curly: ['error', 'multi-line'],
  'default-case-last': ['error'],
  'dot-location': ['error', 'property'],
  'eol-last': ['error'],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'generator-star-spacing': ['error', { before: true, after: true }],
  'multiline-ternary': ['error', 'always-multiline'],
  'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
  'new-parens': ['error'],
  'no-async-promise-executor': ['error'],
  'no-caller': ['error'],
  'no-case-declarations': ['error'],
  'no-class-assign': ['error'],
  'no-compare-neg-zero': ['error'],
  'no-cond-assign': ['error'],
  'no-const-assign': ['error'],
  'no-constant-condition': ['error', { checkLoops: false }],
  'no-control-regex': ['error'],
  'no-debugger': ['error'],
  'no-delete-var': ['error'],
  'no-dupe-args': ['error'],
  'no-dupe-keys': ['error'],
  'no-duplicate-case': ['error'],
  'no-useless-backreference': ['error'],
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-empty-character-class': ['error'],
  'no-empty-pattern': ['error'],
  'no-eval': ['error'],
  'no-ex-assign': ['error'],
  'no-extend-native': ['error'],
  'no-extra-bind': ['error'],
  'no-extra-boolean-cast': ['error'],
  'no-fallthrough': ['error'],
  'no-floating-decimal': ['error'],
  'no-func-assign': ['error'],
  'no-global-assign': ['error'],
  'no-import-assign': ['error'],
  'no-invalid-regexp': ['error'],
  'no-irregular-whitespace': ['error'],
  'no-iterator': ['error'],
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': ['error'],
  'no-misleading-character-class': ['error'],
  'no-prototype-builtins': ['error'],
  'no-useless-catch': ['error'],
  'no-mixed-operators': ['error', {
    groups: [
      ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
      ['&&', '||'],
      ['in', 'instanceof']
    ],
    allowSamePrecedence: true
  }],
  'no-mixed-spaces-and-tabs': ['error'],
  'no-multi-spaces': ['error'],
  'no-multi-str': ['error'],
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
  'no-new': ['error'],
  'no-new-func': ['error'],
  'no-new-object': ['error'],
  'no-new-symbol': ['error'],
  'no-new-wrappers': ['error'],
  'no-obj-calls': ['error'],
  'no-octal': ['error'],
  'no-octal-escape': ['error'],
  'no-proto': ['error'],
  'no-regex-spaces': ['error'],
  'no-return-assign': ['error', 'except-parens'],
  'no-self-assign': ['error', { props: true }],
  'no-self-compare': ['error'],
  'no-sequences': ['error'],
  'no-shadow-restricted-names': ['error'],
  'no-sparse-arrays': ['error'],
  'no-tabs': ['error'],
  'no-template-curly-in-string': ['error'],
  'no-this-before-super': ['error'],
  'no-trailing-spaces': ['error'],
  'no-undef-init': ['error'],
  'no-unexpected-multiline': ['error'],
  'no-unmodified-loop-condition': ['error'],
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-unreachable': ['error'],
  'no-unreachable-loop': ['error'],
  'no-unsafe-finally': ['error'],
  'no-unsafe-negation': ['error'],
  'no-useless-call': ['error'],
  'no-useless-computed-key': ['error'],
  'no-useless-escape': ['error'],
  'no-useless-rename': ['error'],
  'no-useless-return': ['error'],
  'no-var': ['warn'],
  'no-void': ['error', { allowAsStatement: true }],
  'no-whitespace-before-property': ['error'],
  'no-with': ['error'],
  'object-curly-newline': ['error', { multiline: true, consistent: true }],
  'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true, allowAllPropertiesOnSameLine: false }],
  'object-shorthand': ['warn', 'properties'],
  'one-var': ['error', { initialized: 'never' }],
  'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
  'padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],
  'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: false }],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'quote-props': ['error', 'as-needed'],
  'rest-spread-spacing': ['error', 'never'],
  'semi-spacing': ['error', { before: false, after: true }],
  'space-in-parens': ['error', 'never'],
  'space-unary-ops': ['error', { words: true, nonwords: false }],
  'spaced-comment': ['error', 'always', {
    line: { markers: ['*package', '!', '/', ',', '='] },
    block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
  }],
  'symbol-description': ['error'],
  'template-curly-spacing': ['error', 'never'],
  'template-tag-spacing': ['error', 'never'],
  'unicode-bom': ['error', 'never'],
  'use-isnan': ['error', {
    enforceForSwitchCase: true,
    enforceForIndexOf: true
  }],
  'valid-typeof': ['error', { requireStringLiterals: true }],
  'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
  'yield-star-spacing': ['error', 'both'],
  yoda: ['error', 'never'],

  'import/export': ['error'],
  'import/first': ['error'],
  'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
  'import/no-duplicates': ['error'],
  'import/no-named-default': ['error'],
  'import/no-webpack-loader-syntax': ['error'],

  'n/handle-callback-err': ['error', '^(err|error)$'],
  'n/no-callback-literal': ['error'],
  'n/no-deprecated-api': ['error'],
  'n/no-exports-assign': ['error'],
  'n/no-new-require': ['error'],
  'n/no-path-concat': ['error'],
  'n/process-exit-as-throw': ['error'],

  'promise/param-names': ['error']
}

// const eslintRuleNames = [...(new TSESLint.Linter()).getRules().keys()]
// const namesOfEslintRulesForWhichWeAreUsingTsEquivalents = eslintRuleNames
//   .filter(name => Object.hasOwn(rules, `@typescript-eslint/${name}`))

const config = {
  plugins: [
    '@typescript-eslint',
    'import',
    'n',
    'promise'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  rules: {
    // ...Object.fromEntries(namesOfEslintRulesForWhichWeAreUsingTsEquivalents.map(name => [name, ['off']])),
    ...rules
  }

}

module.exports = config;
