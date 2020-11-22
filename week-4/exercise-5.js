(function changeBackgroundColor(sColor1, sColor2) {
  let pTags = document.getElementsByTagName("p");
  let classHeadertitle = document.getElementsByClassName("headertitle");

  for (let element of pTags) {
    element.style.backgroundColor = sColor1;
  }

  for (let element of classHeadertitle) {
    element.style.backgroundColor = sColor2;
  }

  document.title = `${pTags.length} параграфа, ${classHeadertitle.length} елемента с клас <headertitle>`;
})("red", "blue");