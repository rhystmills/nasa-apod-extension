import React from "react";

export default class RightArrow extends React.Component {

	constructor(props, ...rest) {
		super(props, ...rest);
		this.state = {
    };
	}
  render(){
    return (
			<svg
       xmlns="http://www.w3.org/2000/svg"
       width="30"
       height="30"
       version="1.1"
       viewBox="0 0 7.937 7.937"
			 className={this.props.className}
     >
       <g
         stroke="none"
         strokeOpacity="1"
         transform="translate(0 -289.063)"
       >
         <path
           strokeLinecap="butt"
           strokeLinejoin="miter"
           strokeWidth="0.011"
           d="M3.398 291.558l.981 1.09H2.254v.763h2.125l-.98 1.09h.871l1.417-1.472-1.417-1.471z"
         ></path>
         <path
           style={{
             lineHeight: "normal",
             fontVariantLigatures: "normal",
             fontVariantPosition: "normal",
             fontVariantCaps: "normal",
             fontVariantNumeric: "normal",
             fontVariantAlternates: "normal",
             fontFeatureSettings: "normal",
             WebkitTextIndent: "0",
             textIndent: "0",
             WebkitTextAlign: "start",
             textAlign: "start",
             WebkitTextDecorationLine: "none",
             textDecorationLine: "none",
             WebkitTextDecorationStyle: "solid",
             textDecorationStyle: "solid",
             WebkitTextDecorationColor: "#000000",
             textDecorationColor: "#000000",
             WebkitTextTransform: "none",
             textTransform: "none",
             WebkitTextOrientation: "mixed",
             textOrientation: "mixed",
             whiteSpace: "normal",
             shapePadding: "0",
             isolation: "auto",
             mixBlendMode: "normal",
             solidColor: "#000000",
             solidOpacity: "1"
           }}
           strokeDasharray="none"
           strokeDashoffset="0"
           strokeLinecap="square"
           strokeLinejoin="bevel"
           strokeMiterlimit="4"
           strokeWidth="0.383"
           d="M3.97 289.16a3.872 3.872 0 00-3.868 3.87 3.872 3.872 0 003.869 3.868 3.872 3.872 0 003.868-3.869 3.872 3.872 0 00-3.868-3.868zm0 .384a3.483 3.483 0 013.486 3.485 3.483 3.483 0 01-3.485 3.486 3.483 3.483 0 01-3.486-3.486 3.483 3.483 0 013.486-3.485z"
           baselineShift="baseline"
           clipRule="nonzero"
           color="#000"
           colorInterpolation="sRGB"
           colorInterpolationFilters="linearRGB"
           colorRendering="auto"
           direction="ltr"
           display="inline"
           dominantBaseline="auto"
           enableBackground="accumulate"
           fontFamily="sans-serif"
           fontSize="medium"
           fontStretch="normal"
           fontStyle="normal"
           fontVariant="normal"
           fontWeight="normal"
           imageRendering="auto"
           letterSpacing="normal"
           opacity="1"
           overflow="visible"
           shapeRendering="auto"
           textAnchor="start"
           textDecoration="none"
           textRendering="auto"
           vectorEffect="none"
           visibility="visible"
           wordSpacing="normal"
           writingMode="lr-tb"
         ></path>
       </g>
     </svg>
    );
  }
}
