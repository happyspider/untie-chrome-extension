var words = new Lexer().lex(window.getSelection().toString());
var taggedWords = new POSTagger().tag(words);

var output = "";

for (i in taggedWords) {
	var taggedWord = taggedWords[i];
	var word = taggedWord[0];
	var tag = taggedWord[1];
	output += ("<span class=\"" + tag.toLowerCase() + "\">" + word + "</span>" + " ");
}

console.log(output);

replaceSelection(output);

function replaceSelection(html) {
    var sel, range, node;

    if (typeof window.getSelection != "undefined") {
        // IE 9 and other non-IE browsers
        sel = window.getSelection();

        // Test that the Selection object contains at least one Range
        if (sel.getRangeAt && sel.rangeCount) {
            // Get the first Range (only Firefox supports more than one)
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();

            // Create a DocumentFragment to insert and populate it with HTML
            // Need to test for the existence of range.createContextualFragment
            // because it's non-standard and IE 9 does not support it
            if (range.createContextualFragment) {
                node = range.createContextualFragment(html);
            } else {
                // In IE 9 we need to use innerHTML of a temporary element
                var div = document.createElement("div"), child;
                div.innerHTML = html;
                node = document.createDocumentFragment();
                while ( (child = div.firstChild) ) {
                    node.appendChild(child);
                }
            }
            range.insertNode(node);
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE 8 and below
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
}
