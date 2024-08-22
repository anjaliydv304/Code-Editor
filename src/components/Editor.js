import React, { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror';

import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

import { closeBrackets} from '@codemirror/autocomplete';

const Editor = () => {
const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorView({
        doc: '',
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          closeBrackets(),
        ],
        parent: editorRef.current,
      });
    }
  }, []);

  return <div ref={editorRef}></div>;
}

export default Editor
