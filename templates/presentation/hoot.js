export default {
    colors: {
      text: '#fff',
      background: '#000',
      primary: '#00e6ff',
      secondary: '#ff006a',
      darkgray: '#333',
    },
    // styles: {
    //   root: {
    //     textAlign: 'left',
    //     contentAlign: 'left'
    //   },
    //   Slide: {
    //     display: 'block',
    //     padding: '1em',
    //     textAlign: 'left',
    //   },
    //   pre: {
    //     color: 'secondary',
    //     bg: 'background',
    //   },
    //   a: {
    //     color: 'secondary',
    //     bg: 'secondary'
    //   }
    // },
    a: {
      color: '#00e6ff',
      bg: 'secondary'
    },
    fonts: {
        monospace: 'Monaco'
    },
      codeSurfer: {
        styles: [{
          types: ["comment", "prolog", "doctype", "cdata"],
          style: {
            color: "#999988",
            fontStyle: "italic"
          }
        }, {
          types: ["namespace"],
          style: {
            opacity: 0.7
          }
        }, {
          types: ["string", "attr-value"],
          style: {
            color: "#e3116c"
          }
        }, {
          types: ["punctuation", "operator"],
          style: {
            //white
            color: "#ddddda"
          }
        }, {
          types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
          style: {
            color: "#36acaa"
          }
        }, {
          types: ["atrule", "keyword", "attr-name", "selector"],
          style: {
            color: "#00a4db"
          }
        }, {
          types: ["function", "deleted", "tag"],
          style: {
            color: "#d73a49"
          }
        }, {
          types: ["function-variable"],
          style: {
            color: "rgba(0,230,255,1)"
          }
        }, {
          types: ["tag", "selector"],
          style: {
            color: "#00a0fc"
          }
        }],
        subtitle: {
          color: "#d6deeb",
          background: "rgba(10,10,10,0.9)"
        },
        pre: {
          color: "#787e89",
          background: "#000000"
        },
        code: {
          color: "#787e89",
          background: "#000000"
        }
      }
    };
