import {GetToken} from "@http/index"
/*
*   bucket
*   头像、图片：apl-static     https://apl-static.oss-cn-beijing.aliyuncs.com/
*   文件：apl-docs         https://apl-docs.oss-cn-beijing.aliyuncs.com/
*   文件：apl-oa-file         https://apl-oa-file.oss-cn-beijing.aliyuncs.com/
* */


interface Token{
  key: string;
  OSSAccessKeyId: string;
  access_key_secret: string;
  "x-oss-security-token": string;
}
interface UploadPrams{
  partSize: number;
  progress?: any;
}
declare var OSS: any;

export async function Upload(bucket:string, file:File, progress?){
  let fileName = "",
    name = file.name,
    isIMG = /(png|jpg|jpeg)$/i.test(name),
    client;

  if(bucket === 'apl-static' && !/(png|jpg|jpeg|gif)$/i.test(name)){
    // message.error("请选择图片");
    return;
  }

  // 获取权限
  let token = await GetToken<Token>();
  fileName = token.key + name.match(/\.[A-z\d]+$/)[0];
  client = new OSS.Wrapper({
    region: 'oss-cn-beijing',
    accessKeyId: token.OSSAccessKeyId,
    accessKeySecret: token.access_key_secret,
    bucket,
    stsToken: token['x-oss-security-token']
  });


  // 图片大于5M时，压缩上传
  if(isIMG && file.size > 1024000 * 5) {
    // File对象转换成base64
    let base64 = await FileToBase64(file);
    let blob = await Base64ToBlob(base64);
    // blob转arrayBuffer
    let buffer = await blobToBuffer(blob);
    buffer = new OSS.Buffer(buffer);
    // 上传
    try {
      return await client.put(fileName, buffer);
    } catch(err){
      throw err;
    }
  } else {
    let params:UploadPrams = {
      partSize: 1024000 * 2
    };
    if(progress){
      params.progress = function* (percentage, cpt) {
        if(cpt) {
          progress && progress(percentage, {client, uploadId: cpt.uploadId, bucket, fileName});
        } else {
          progress && progress(percentage);
        }
      }
    }

    try {
      return await client.multipartUpload(fileName, file, params);
    } catch(err) {
      throw err;
    }
  }
}

export function FileToBase64(file){
  return new Promise((resolve => {
    let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image();

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function (this:any) {
      img.src = this.result;
      img.onload = function(this:any){
        canvas.height = this.height;
        canvas.width = this.width;

        ctx.drawImage(this, 0, 0, this.width, this.height);

        let ext = img.src.match(/(png|jpe?g)/)[0];
        let base64 = canvas.toDataURL(`image/${ext}`, 0.2);
        canvas = null;

        resolve(base64);
      };
    }
  }))
}

export function Base64ToBlob(base64){
  var base = base64.split(',')[1],
    fileType = base64.split(';')[0].split(':')[1],
    bytes = window.atob(base),
    n = bytes.length,
    u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bytes.charCodeAt(n);
  }

  return new Blob([u8arr],{type:fileType});
}

function blobToBuffer(blob){
  return new Promise((resolve => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = function (event: any) {
      resolve(event.target.result);
    }
  }))
}
