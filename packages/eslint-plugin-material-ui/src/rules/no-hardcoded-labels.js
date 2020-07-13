const createEmojiRegex = require('emoji-regex');

module.exports = {
  meta: {
    messages: {
      'literal-label':
        "Don't use hardcoded labels. Prefer translated values by using `t` from the redux store.",
    },
  },
  create(context) {
    const { allow = [] } = context.options[0] || {};
    const emojiRegex = createEmojiRegex();

    function valueViolatesRule(value) {
      const sanitizedValue = typeof value === 'string' ? value.trim() : value;
      const hasTranslateableContent = sanitizedValue !== '' && !emojiRegex.test(sanitizedValue);

      return hasTranslateableContent && !allow.includes(sanitizedValue);
    }

    return {
      JSXText(node) {
        if (node.parent.type === 'JSXElement') {
          if (valueViolatesRule(node.value)) {
            context.report({ messageId: 'literal-label', node });
          }
        }
      },
      Literal(node) {
        const canLabelComponent =
          node.parent.type === 'JSXElement' ||
          (node.parent.type === 'JSXAttribute' && ['aria-label'].includes(node.parent.name.name));

        if (canLabelComponent && valueViolatesRule(node.value)) {
          context.report({ messageId: 'literal-label', node });
        }
      },
    };
  },
};
