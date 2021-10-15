const wrap = `<ul class="history-group"></ul>`;
const item = `
<li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item cursor-pointer" 
    COLABO_SRNO="{COLABO_SRNO}" 
    COLABO_COMMT_SRNO="{COLABO_COMMT_SRNO}" 
    COLABO_REMARK_SRNO="{COLABO_REMARK_SRNO}"
    ALARM_ACTION="{ALARM_ACTION}"
    ALARM_STATUS="{ALARM_STATUS}"
    TOAST_MSG="{msg}"
    TOAST_CNTN="{contents}">
    <div class="all-setup-picture-type-1" {profile-style}></div> 
    <div class="all-text-wrap-type-1">
      <div class="all-text-wrap-type-2"><i class="{emoti-class}"></i>{ALAM_MSG}</div>
      <div class="all-text-wrap-type-3">{task-name-tag}{ALAM_CNTN}</div>
      <div class="all-text-wrap-type-3">
        <span {img-display}><em class="all-setup-icon-type-1"></em>이미지</span>
        <span {file-display}><em class="all-setup-icon-type-2"></em>파일</span>
      </div>
    </div>
    <div class="all-setup-section-type-1"><em>{data-text}</em></div>
  </li>
`

export {wrap, item}