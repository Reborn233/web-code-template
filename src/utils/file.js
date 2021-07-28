export default {
  /**
   * canvas转base64
   * @param {HTMLElement<Canvas>} canvas canvas元素
   * @param {String} type 'image/jpeg'....
   * @param {Number} encoder 0-1,图片的质量
   * @returns base64
   */
  canvasToDataUrl (canvas, type, encoder = 1) {
    return canvas.toDataURL(type, encoder);
  },
  /**
   * File对象转换为dataURL、Blob对象转换为dataURL
   * @param {File | Blob} blob 文件类型或者blob类型
   * @param {Function} callBack 回调函数
   * @returns base64
   */
  readBlobAsDataURL (blob, callBack = () => {}) {
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      const data =
        typeof e.target.result === 'object'
          ? window.URL.createObjectURL(new Blob([e.target.result]))
          : e.target.result;
      callBack(data);
      fileReader = null;
    };
    fileReader.readAsDataURL(blob);
  },
  /**
   * dataURL转换为Blob对象
   * @param {Base64} dataUrl
   * @returns Blob
   */
  dataURLtoBlob (dataUrl) {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  /**
   * dataURL转换为File对象
   * @param {Base64} dataUrl base64
   * @param {String} filename 文件名称
   * @description 兼容性：Edge(IE)浏览器不支持File对象构造函数，也就是Edge(IE)里不能new File()。
   */
  dataURLtoFile (dataUrl, filename) {
    let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },
  /**
   * 普通文件下载
   * @param {ArrayBuffer} content
   * @param {String} filename
   */
  fileDownload (content, filename) {
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([content]);
    let _url = window.URL.createObjectURL(blob);
    eleLink.href = _url;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
    // 释放掉blob对象
    window.URL.revokeObjectURL(_url);
  }
};
