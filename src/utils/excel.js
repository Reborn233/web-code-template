import XLSX from 'xlsx';

export const sheet2blob = (sheet, sheetName) => {
  sheetName = sheetName || 'sheet1';
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  };
  workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

  const wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  };
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }); // 字符串转ArrayBuffer

  function s2ab (s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  return blob;
};

export const openDownloadDialog = (url, saveName) => {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
};

export const aoaToExcel = (data, filename) => {
  const sheet = XLSX.utils.aoa_to_sheet(data);
  sheet['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }];
  openDownloadDialog(sheet2blob(sheet), filename);
};

export const jsonToExcel = (data, filename) => {
  const sheet = XLSX.utils.json_to_sheet(data, {
    header: ['经销商名称', '邀请码']
  });
  sheet['!cols'] = [{ wch: 20 }, { wch: 20 }];
  openDownloadDialog(sheet2blob(sheet), filename);
};

export const readExcelData = (data, sheet = 'Sheet1') => {
  const workbook = XLSX.read(data, {
    type: 'binary'
  });
  const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  return json;
};
