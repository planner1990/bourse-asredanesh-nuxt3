const ws_address: string = process.env.WS_SERVER || "ws://127.0.0.1:8003";

class Subscrib {
  token: string;
  channels: Array<string>;

  constructor(channels: Array<string>) {
    this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhdWQiOltdLCJleHAiOjE2MjM0MTE5MDUsImlhdCI6MTYyMzA0NjkwNSwiaXNzIjoiaXNzIiwibmJmIjoxLCJzdWIiOiJ1cGRhdGVfY2hhbm5lbF9zZXJ2ZXJfdGVzdCIsImNoYW4iOlsic3BfY2hhbjEiLCJzcF9jaGFuMiJdfQ.FEOF9iTckqQZNBJR1hK9LA4lhbxZccBXg0H9A97yIv0GKYU3KMKLOwuehAeFKBIShhceOaWJ-1YeXXP6cSs_nDaz8Xz-bb6HfW2sqHPs5fBPTfY6p_M3f4OWuxL29kLpasM04WRHftgnNcEXKZhGpjxatMfWOkGVbwYeXFRK0Ps8M_L5QgefCmbQGERnN_IKe3GUseBolZWT7xs3Y49hfP69FctrDL0TfcnfT2FOf1D5xFXtI38o1qY6t8ZKcajvURpVDBAZo0axEtdT45lUj_750S4ySvndYwtN8VtBdziBHDZTAA_ZnQGnUsrRNkV2HGBTmz_ot2_76zmufHpMsg";
    this.channels = channels;
  }

}

export {
  ws_address,
  Subscrib
};