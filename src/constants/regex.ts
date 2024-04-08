export const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/;
export const YOUTUBE_REGEX_GLOBAL =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/(?!channel\/)(?!@)(.+)?$/g;
export const REGEX_HTTP = /^https?:\/\//;
export const YOUTUBE_SEARCH =
  /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/results?(?!@)(.+)?$/g;
export const EMPTY_YOUTUBE_HTML =
  /<div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" cclanguage="ko" disablekbcontrols="false" enableiframeapi="true" endtime="0" interfacelanguage="ko" ivloadpolicy="0" loop="false" modestbranding="false" playlist="" start="0"><\/iframe><\/div>/g;
