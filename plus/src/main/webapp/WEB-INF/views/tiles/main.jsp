<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
</head>
<body>

	<!-- 결제 : 회원가입화면 참고 -->
	<div class="upgrade-version-wrap js-payment-layer" id="businessLayer">
		<p class="upgrade-version-text-1">비즈니스 베이직 버전 결제</p>
		<p class="upgrade-version-text-2">요금은 매월 10일 자동 결제되며, 사용인원에 따라
			결제금액이 변경될 수 있습니다.</p>
		<button id="helpPaymentBtn" class="upgrade-version-button-1">결제
			도움말</button>
		<div class="upgrade-version-section-2">
			<section class="payment-contents">
				<form action="">
					<fieldset>
						<legend class="blind">비즈니스 베이직 버전 결제 폼</legend>
						<div class="payment-left">
							<strong class="form-tit">결제정보 입력</strong>
							<ul id="payInfoUl" class="payment-info">
								<li><label class="payment-info-title">이름</label> <input
									id="userName" class="payment-input" type="text"
									placeholder="이름을 입력하세요">
									<p class="error-text d-none">이름을 확인해주세요</p></li>
								<li><label class="payment-info-title">이메일</label> <input
									id="userEmail" class="payment-input disabled" type="text"
									placeholder="helpflow@flow.team" disabled=""></li>
								<li><label class="payment-info-title">전화번호</label> <input
									id="phoneNum" class="payment-input js-number-input"
									autocomplete="off" maxlength="15" type="text"
									placeholder="ex) 01012345678">
									<p class="error-text d-none">전화번호 형식이 맞지 않습니다.</p></li>
								<li id="cardLi"><label class="payment-info-title">카드번호</label>
									<input id="cardNum1"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum2"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum3"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum4"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4">
									<p class="error-text d-none">카드번호를 확인해주세요.</p></li>
								<li id="expiryLi"><label class="payment-info-title">유효기간</label>
									<select id="expiryMonth" class="payment-select">
										<option value="" selected="" disabled="" hidden="">MM</option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
								</select> <select id="expiryYear" class="payment-select">
										<option value="" selected="" disabled="" hidden="">YYYY</option>
										<option value="2021">2021</option>
										<option value="2022">2022</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
								</select>
									<p class="error-text d-none">유효기간을 선택해 주세요.</p></li>
								<li><label class="payment-info-title">비밀번호 앞 두자리</label> <input
									id="cardPassword"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="2"> <span class="icon-password">● ●</span>
									<p class="error-text d-none">비밀번호를 확인해 주세요.</p></li>
								<li><label class="payment-info-title">사업자번호 10자리
										(법인) ㅣ 생년월일 6자리 (개인)</label> <input id="birthdayNum"
									class="payment-input js-number-input" type="text"
									placeholder="- 빼고 입력" maxlength="10">
									<p class="error-text d-none">사업자번호 또는 생년월일을 확인해주세요.</p></li>
							</ul>
						</div>
						<div class="payment-right">
							<div class="payment-amount-wrap">
								<div class="payment-amount-header">결제 금액</div>
								<div class="payment-amount-content">
									<ul class="payment-info">
										<li>
											<div class="payment-info-title">결제주기</div>
											<div class="payment-cycle" id="payOption" data-option="Y">
												연간 정기 결제<span class="payment-sale">20% 할인</span>
											</div>
											<ul id="payOptionSelect" class="payment-cycle-group"
												style="display: none">
												<li id="yearSelect">
													<div>
														연간 정기 결제<span class="payment-sale">20% 할인</span>
													</div>
												</li>
												<li id="monthSelect">
													<div>월간 정기 결제</div>
												</li>
											</ul>
										</li>
										<li>
											<div class="payment-info-title">
												예상금액
												<button id="calculatorBtn" class="calculator-button">요금계산기</button>
											</div>
											<ul class="estimated-amount">
												<li>
													<div>현재 사용 인원</div>
													<div>
														<input id="userCnt" type="text" value="124"
															class="users-number" disabled="">명
														<p class="tooltip-square">
															예상금액은 현재 사용인원 기준으로 계산되며,<br> 사용 인원에 따라 결제금액이 변경될 수
															있습니다.<br> <em>10명까지 월 <em id="monthPriceMain">60,000</em>원
																적용,
															</em><br> <em>10명 초과 시, 인원 당 월 <em
																id="monthPriceSub">6,000</em>원 적용됩니다.
															</em>
														</p>
													</div>
												</li>
												<li>
													<div>예상 결제금액</div>
													<div>
														₩ <strong id="price">600,000,000</strong>/<em
															class="js-pay-gubun"></em>
													</div>
												</li>
												<li>
													<div>절약금액</div>
													<div>
														₩ <strong id="savings">120,000,000</strong>/<em
															class="js-pay-gubun"></em>
													</div>
												</li>
											</ul>
										</li>
										<li><label class="payment-info-title">추천인 입력 <span>필수
													입력사항은 아닙니다.</span>
										</label> <input type="text" id="recommendId" class="payment-input"
											placeholder="아이디 또는 이메일 주소 입력"></li>
									</ul>
									<input type="checkbox" id="paymentAgree"
										class="payment-agree-input"> <label
										class="payment-agree" for="paymentAgree"> <span
										class="payment-agree-text"><a id="termsOfServiceBtn"
											href="#">정기과금 이용약관</a> 내용을 확인하였고, 이에 동의합니다.</span>
									</label>
									<p class="error-text d-none">정기과금 이용약관에 동의해 주세요.</p>
									<button type="button" class="payment-button" id="submitPayment">정기결제
										신청</button>
								</div>
							</div>
						</div>
					</fieldset>
				</form>
				<p class="payment-description">결제정보는 암호화하여 안전하게 전송되며, 서버에 저장되지
					않습니다.</p>
			</section>
		</div>
	</div>
	<div class="upgrade-version-wrap d-none js-payment-layer"
		id="freelancerLayer">
		<p class="upgrade-version-text-1">결제수단 변경</p>
		<p class="upgrade-version-text-2">결제수단으로 사용할 카드 정보를 입력해 주세요.</p>
		<p class="upgrade-version-text-3">카드 확인을 위해 1,000원 결제 후 취소됩니다.</p>
		<div class="upgrade-version-section-2">
			<section class="payment-contents">
				<form action="">
					<fieldset>
						<legend class="blind">비즈니스 베이직 버전 결제 폼</legend>
						<div class="payment-left payment-change">
							<ul id="freePaymentUl" class="payment-info">
								<li><label class="payment-info-title">이름</label> <input
									id="userName" class="payment-input" type="text"
									placeholder="이름을 입력하세요">
									<p class="error-text d-none">이름을 확인해주세요</p></li>
								<li><label class="payment-info-title">이메일</label> <input
									id="userEmail" class="payment-input disabled" type="text"
									placeholder="helpflow@flow.team" disabled=""></li>
								<li><label class="payment-info-title">전화번호</label> <input
									id="phoneNum" class="payment-input js-number-input"
									maxlength="15" type="text" autocomplete="off"
									placeholder="ex) 01012345678">
									<p class="error-text d-none">전화번호 형식이 맞지 않습니다.</p></li>
								<li id="cardLi"><label class="payment-info-title">카드번호</label>
									<input id="cardNum1"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum2"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum3"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4"> <input id="cardNum4"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="4">
									<p class="error-text d-none">카드번호를 확인해주세요.</p></li>
								<li id="expiryLi"><label class="payment-info-title">유효기간</label>
									<select id="expiryMonth" class="payment-select">
										<option value="" selected="" disabled="" hidden="">MM</option>
										<option value="01">01</option>
										<option value="02">02</option>
										<option value="03">03</option>
										<option value="04">04</option>
										<option value="05">05</option>
										<option value="06">06</option>
										<option value="07">07</option>
										<option value="08">08</option>
										<option value="09">09</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
								</select> <select id="expiryYear" class="payment-select">
										<option value="" selected="" disabled="" hidden="">YYYY</option>
										<option value="2021">2021</option>
										<option value="2022">2022</option>
										<option value="2023">2023</option>
										<option value="2024">2024</option>
										<option value="2025">2025</option>
								</select>
									<p class="error-text d-none">유효기간을 선택해 주세요.</p></li>
								<li><label class="payment-info-title">비밀번호 앞 두자리</label> <input
									id="cardPassword"
									class="payment-input input-type2 js-number-input" type="text"
									maxlength="2"> <span class="icon-password">● ●</span>
									<p class="error-text d-none">비밀번호를 확인해 주세요.</p></li>
								<li><label class="payment-ㄹinfo-title">사업자번호 10자리
										(법인) ㅣ 생년월일 6자리 (개인)</label> <input id="birthdayNum"
									class="payment-input js-number-input" type="text"
									placeholder="- 빼고 입력" maxlength="10">
									<p class="error-text d-none">사업자번호 또는 생년월일을 확인해주세요.</p></li>
								<li><label class="payment-info-title">추천인 입력<span>필수
											입력사항은 아닙니다.</span></label> <input type="text" id="recommendId"
									class="payment-input" placeholder="아이디 또는 이메일 주소 입력"></li>
							</ul>
							<div class="join-check js-join-check">
								<input id="paymentConfirmCheck" type="checkbox"
									class="js-confirm-input confirm-input"> <label
									for="paymentConfirmCheck" class="js-confirm-check"></label> <span
									class="payment-agree-text"> <a id="termsOfServiceBtn"
									href="#">정기과금 이용약관</a> 내용을 확인하였고, 이에 동의합니다.
								</span>
								<p class="error-text d-none">정기과금 이용약관에 동의해 주세요.</p>
							</div>
							<button type="button" class="payment-button" id="submitPayment">결제수단
								변경</button>
						</div>
					</fieldset>
				</form>
				<p class="payment-description">결제정보는 암호화하여 안전하게 전송되며, 서버에 저장되지
					않습니다.</p>
			</section>
		</div>
	</div>
	<div id="waitPaymentPopup" class="flow-all-background-1 d-none">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div class="loading-popup flow-project-popup-6">
					<div class="flow-content">
						<div class="flow-content-text">
							<p class="popup-cont">
								결제 진행 중 입니다.<br>잠시만 기다려 주세요
							</p>
						</div>
						<div class="loading">
							<i class="circle"></i> <i class="circle"></i> <i class="circle"></i>
							<i class="circle"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>










	<!-- 결제 : 회원가입화면 참고 -->
	<div id="paymentPopup" tabindex="-1"
		class="flow-all-background-1 d-none">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="paymentPopupLayer" class="popup-wr">
					<div class="popup-tit">
						<strong id="popupTitle" class="section-tit"></strong>
						<button id="closeBtn" class="btn-close">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div id="content"></div>
				</div>
			</div>
		</div>
	</div>

	<div id="paymentPopupContent" class="d-none">
		<div class="js-calculator-item">
			<div class="payment-section">
				<strong class="section-tit">결제주기</strong>
				<div class="payment-cycle" id="calPayOption" data-option="Y">
					연간 정기 결제<span class="payment-sale">20% 할인</span>
				</div>
				<ul id="calOptionSelect" class="payment-cycle-group"
					style="display: none;">
					<li id="yearSelect">
						<div>
							연간 정기 결제<span class="payment-sale">20% 할인</span>
						</div>
					</li>
					<li id="monthSelect">
						<div>월간 정기 결제</div>
					</li>
				</ul>
			</div>
			<div class="payment-section">
				<strong class="section-tit">예상금액</strong>
				<table class="payment-bill">
					<tbody>
						<tr>
							<td>현재 사용인원</td>
							<td><input id="calUserCnt" type="text" maxlength="4"
								value="10"> <span>명</span></td>
						</tr>
						<tr>
							<td>예상 결제금액</td>
							<td><input id="calPrice" type="text" value="₩600,000">
								<span class="js-cal-gubun"> /년</span></td>
						</tr>
						<tr>
							<td><i class="icon-idea"></i> 절약금액</td>
							<td><input id="calSavings" type="text" value="₩120,000">
								<span class="js-cal-gubun"> /년</span></td>
						</tr>
					</tbody>
				</table>
				<p class="alert-txt">매월 사용 인원수에 따라 이용 금액이 변경 될 수 있습니다.</p>
			</div>
			<button class="btn-qna js-question-btn">
				<i></i> 자주묻는 질문 보기
			</button>
		</div>
		<div class="js-tearm-of-service-item">
			<div class="agreement-section">
				<strong>과금 정책</strong>
				<ul class="agreement-contents">
					<li>・ 선택한 요금제에 따라서 월간 혹은 연간 과금 형태로 결제가 진행됩니다.</li>
					<li>・ 정확한 결제 정보를 입력하셔야 하며, 결제 정보를 제공할 경우 플로우(또는 플로우가 지정한 결제
						대행업체)가 해당 거래에 필요한 결제 금액 전체를 청구할 수 있도록 허가한 것으로 간주합니다. 부가세는 별도로
						부과됩니다.</li>
					<li>・ 별도의 취소 의사가 없는한, 선택한 요금제에 과금이 진행됩니다. 취소 시, 결제 중단 처리가 되며
						청구할 금액이 남아 있다면 다음달에 과금이 청구됩니다.</li>
					<li>・ 이미 지불이 완료된 금액에 대해서는 환불이 불가합니다. 단, 플로우의 귀책 사유로 인해 잘못된 금액이
						결제되었거나 초과 과금이 발생한 경우 환불이 가능합니다.</li>
				</ul>
				<br> <strong>월간 과금</strong>
				<ul class="agreement-contents">
					<li>・ 매달 정기적으로 이전달 사용금액에 대해서 결제가 진행됩니다. 기본요금 이외에 등록된 매월 최대
						사용인원을 기준으로 추가요금이 산정됩니다. 월간 과금에서 연간 과금으로 전환을 지원하지 않습니다.</li>
				</ul>
				<br> <strong>연간 과금</strong>
				<ul class="agreement-contents">
					<li>・ 연간 사용금액에 대해서 선결제가 진행됩니다. 기본요금 이외에 등록된 사용인원을 기준으로 추가요금이
						산정됩니다. 만일 연간 과금 결제 이후 추가인원이 늘어날 경우 추가된 인원에 대해서도 과금이 청구됩니다. 연간 과금에서
						월간 과금으로 전환을 지원하지 않습니다.</li>
					<li>・ 연간 과금으로 결제 시, 계약 기간 중 서비스 탈퇴 시 위약금이 발생합니다. 위약금은 "월간과금 대비
						할인받은 금액 + 남은 기간 동안 지불할 금액의 10%"이며, 위약금에는 Tax가 부과되지 않습니다.</li>
					<li>・ 월간과금 대비 할인받은 금액은 연간과금 계약시 체결한 월 청구금액 기준으로 계산되며, 남은 기간 동안
						지불할 금액의 10%는 서비스 탈퇴 신청일부터 이전 30일동안 최대 사용인원 기준으로 계산됩니다. <br>
						위약금 계산 공식은 아래와 같습니다. <br> (1) 월간과금 요금제 대비 할인받은 금액 = {사용기간 월 X
						(월간과금제월요금 - 연간과금제월요금)}<br> (2) 남은 기간 동안 지불할 금액의 10% = {연간과금제
						월계약금액 X (총계약기간 월-사용기간 월)+(추가사용인원 사용금액)} X 10%<br> (3) 위약금 =
						(1) + (2)
					</li>
				</ul>
				<br> <strong>결제 실패</strong>
				<ul class="agreement-contents">
					<li>・ 결제 시점에 결제가 실패하면 사용 중인 요금제는 결제중지 처리가 됩니다. 미납액이 발생하는 경우
						30일 이상 지속되면 결제실패와 동일하게 처리합니다.</li>
				</ul>
				<br> <strong>기타</strong>
				<ul class="agreement-contents">
					<li>・ 플로우가 지정한 결제 대행업체는 결제 처리를 위해 제공해주신 결제 정보를 수집 및 저장할 수 있으며,
						결제 정보는 결제 외 다른 용도로 사용되지 않습니다. 취소 관련 문의는 <a
						class="payment-popup-link" href="mailto:help@flow.team">help@flow.team
					</a>또는 1:1 문의하기를 통해 가능합니다.
					</li>
				</ul>

				<ul class="agreement-contents">
					<li>・ 본 약관에 명시되지 않은 내용은 플로우 <a class="payment-popup-link"
						href="/terms.act" target="serviceTerms">서비스 이용약관</a> 및 <a
						class="payment-popup-link" href="https://flow.team/privacy.act"
						target="flowPrivacy">개인정보 취급방침</a>을 따릅니다.
					</li>
					<li>・ 시행일 : 2017년 12월 31일</li>
				</ul>
			</div>
		</div>
		<div class="js-account-item">
			<ul class="account-contents">
				<li><i class="icon-mail"></i> <a href="mailto:help@flow.team">help@flow.team</a>
				</li>
				<li>
					<p>아래의 서류를 준비하여 메일로 보내주세요.</p>
					<button class="btn-qna js-question-btn">
						<i></i> 자주묻는 질문 보기
					</button>
				</li>
				<li><strong>계좌이체</strong> <span class="dot">사업자등록증</span></li>
				<li><strong>자동이체</strong> <span class="dot">사업자등록증</span> <span
					class="dot"> 자동출금신청 동의서
						<button id="autoAccountDownload" class="btn-download">
							<i class="icons-download"></i> 다운로드
						</button>
				</span></li>
			</ul>
		</div>
	</div>








	<!-- 기존회사 참여 : 회원가입화면 참고 -->
	<div id="companyJoinLayer" class="d-none">
		<div class="upgrade-singup-header">
			<a href="http://" class="logo"> <img
				src="flow-renewal/assets/images/flow_logo_small.png">
			</a> <a href="#" id="closeBtn" class="login-close-button"></a>
		</div>
		<div id="companyJoinMain" class="login-wrap invite-login">
			<div class="login-text">기존회사 참여</div>
			<div class="login-company">이미 회사에서 플로우를 사용하고 있다면 회사 URL을 입력하여
				함께하세요.</div>
			<div class="join-contents">
				<p class="url-tit">회사 URL</p>
				<div class="url-wr">
					<span>https://</span> <input id="joinInput" type="text"
						class="join-input" autocomplete="off" placeholder="회사 URL">
					<!-- 입력 오류 시 .error 클래스 추가 -->
					<span>.flow.team</span>
				</div>
				<p id="errMeg" class="error-text d-none">3~5자 영문, 숫자만 가능합니다.</p>
				<!-- 입력 오류 시 display: block -->
			</div>
			<button id="companyJoinBtn" class="btn-join">회사 참여하기</button>
		</div>
		<div id="checkJoinPopup" class="flow-all-background-1 d-none">
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="popupLayer" class="flow-login-popup popup-10">
						<div class="flow-project-header-1">
							회사 정보 확인 후 시작하세요! <a href="#" id="closePopupBtn"
								class="flow-close-type-1"></a>
						</div>
						<div class="flow-content">
							<ul class="content-company">
								<li id="companyLogoUrl" class="logo"></li>
								<li id="companyName" class="name"></li>
								<li id="companyUrl" class="url"></li>
							</ul>
							<button id="joinSubmit" class="btn-popup01">팀 참여하기</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="companyWaitJoinLayer" class="upgrade-singup-wrap d-none">
			<div class="accont-wrap">
				<div class="flow-account" id="waitCompanyName"></div>
				<div class="join-text-bold" id="waitCompanyUrl"></div>
				<div class="join-basic-wrap">
					<div class="join-backgroundimage"></div>
					<div class="guest-singup-complete">
						<em> 관리자에게 가입요청 중입니다. </em>
						<p>관리자 검토 후, 승인 완료 시 접속 가능합니다.</p>
					</div>
					<a href="/main.act" class="join-start-button">메인 페이지 이동</a>
				</div>
			</div>
		</div>
	</div>








	<!-- 잠금모드 -->
	<div id="miniLock" style="display: none">
		<div class="mini-mode-wrap">
			<div class="mini-mode-background-type-1">
				<div class="mini-mode-logo-icon-1"></div>
				<div class="mini-mode-wrap-2">
					<div class="mini-mode-wrap-3">
						<i class="icons-lock"></i>
					</div>
					<div class="mini-mode-wrap-4">
						<div class="mini-mode-picture-1 mini-lock-profile"></div>
					</div>
					<div class="mini-mode-wrap-5">
						<span class="mini-lock-userNm"></span>
					</div>
				</div>
				<div class="mini-mode-login-section-1">
					<div class="mini-mode-password-wrap-1">
						<input type="password" id="miniPassInput"
							class="mini-mode-password-1 js-join-input" placeholder="비밀번호"
							data-valid="login-password" autocomplete="current-password"
							maxlength="20" data-required-yn="Y"
							data-empty-msg="비밀번호를 입력해주세요!" data-over-msg="비밀번호가 20자가 넘으셨습니다!"
							data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
							data-login-err-msg="비밀번호를 확인해 주세요." value="">
						<div id="pwdViewBtn" class="mini-mode-eye-icon-1"
							style="display: none"></div>
					</div>
					<span id="miniLockErrorMsg" class="mini-mode-text-position-fix"></span>
					<div id="miniConfirmBtn" class="mini-mode-button-type-1">확인</div>
				</div>

				<div id="miniLockLogoutBtn"
					class="mini-mode-button-type-1 trans-background-button-type-1">로그아웃</div>
			</div>
		</div>

	</div>

	<div id="allMainContent" class="main-wrap">

		<div class="main-top">
			<header class="header">
				<!-- 라이트 버전 클래스 .light -->
				<div class="top-state-wrap">
					<div id="electronNavi" class="electron-btn-navi d-none">
						<ul>
							<li class="js-history-back js-electron-navi"><a href="#"><i
									class="icon-btn-back"></i></a></li>
							<li class="js-history-forward js-electron-navi"><a href="#"><i
									class="icon-btn-next"></i></a></li>
							<li class="js-page-reload js-electron-navi"><a href="#"><i
									class="icon-btn-refresh js-reload-btn on"></i></a>
								<div id="electronReloadLayer"
									class="electron-load-wrap js-basic-menu js-plus-area d-none">
									<ul>
										<li data-code="reload"
											class="js-plus-area-item js-reload-menu"><a href="#">새로고침<em
												id="js-reload"></em></a></li>
										<li data-code="reload-force"
											class="js-plus-area-item js-reload-menu"><a href="#">강력
												새로고침 (캐시비우기)<em id="js-reload-force"></em>
										</a></li>
									</ul>
								</div></li>
						</ul>
					</div>
				</div>
				<div class="main-search-area cursor-pointer">
					<form id="searchPopupTopButton" class="main-search clearfix">
						<div class="main-search-box">
							<input type="text" class="cursor-pointer" placeholder="전체 검색"
								disabled="">
							<!-- input value 값 존재 시 search-delete-button active  -->
							<button type="button"
								class="js-top-search-delete search-delete-button">
								<span class="blind">삭제</span>
							</button>
						</div>
						<button type="button"
							class="js-detail-search detail-search-button">옵션</button>
					</form>
					<div id="searchPopupLayer" class="name-type-seach-popup"
						data-search-area-code="IN_TONG"
						style="top: 0; right: -50%; display: none">
						<div class="search-popup-header">
							<div class="search-popup-input">
								<i class="js-search-icon icon-search"></i>
								<div class="js-add-section project-blue-button"></div>
								<input id="searchPopupInput" type="text"
									class="name-type-shift-txt" maxlength="20" autocomplete="off"
									placeholder="검색어를 입력해주세요">
								<button class="js-search-del btn-search-delete">
									<i></i>
								</button>
								<button type="button" class="js-detail-search search-set-button">옵션</button>
							</div>
						</div>
						<div class="js-search-section-div">
							<p>
								카테고리
								<button class="js-mouseover" mouseover-noti="true"
									mouseover-text="마지막 설정값이 유지됩니다.">
									<i class="icons-question"></i>
								</button>
							</p>
							<ul class="section-name-list">
								<li data-code="project"
									class="js-search-section section-name-type-1"><a href="#">
										<div class="section-name-icon-1"></div> <span
										class="js-section-name">프로젝트</span> <!--<span>(Alt + P)</span>-->
								</a></li>
								<li data-code="post"
									class="js-search-section section-name-type-2"><a href="#">
										<div class="section-name-icon-2"></div> <span
										class="js-section-name">글 · 댓글</span> <!--<span>(Alt + W)</span>-->
								</a></li>
								<li data-code="file"
									class="js-search-section section-name-type-4"><a href="#">
										<div class="section-name-icon-4"></div> <span
										class="js-section-name">파일</span> <!--<span>(Alt + F)</span>-->
								</a></li>
							</ul>
						</div>
						<div id="detailSearchArea">
							<p>검색 옵션</p>
							<div class="detail-search-conditions">
								<ul class="conditions-group">
									<li class="js-project-name-search-filter" style="display: none">
										<div class="condition-cell title">프로젝트</div>
										<div class="condition-cell">
											<input type="text">
										</div>
									</li>
									<li class="js-register-name-search-filter"
										style="display: none">
										<div class="condition-cell title">작성자</div>
										<div class="condition-cell">
											<input type="text">
										</div>
									</li>
									<li class="js-participant-name-search-filter"
										style="display: none">
										<div class="condition-cell title">참여자</div>
										<div class="condition-cell">
											<input type="text">
										</div>
									</li>
									<li class="js-period-type-search-filter">
										<div class="condition-cell title">기간 설정</div>
										<div class="condition-cell">
											<ul class="target-select-group"></ul>
										</div>
									</li>
									<li class="js-tmpl-type-search-filter" style="display: none">
										<div class="condition-cell title">대상</div>
										<div class="condition-cell">
											<ul class="target-select-group"></ul>
										</div>
									</li>
									<li class="js-file-type-search-filter" style="display: none">
										<div class="condition-cell title">파일종류</div>
										<div class="condition-cell">
											<ul class="target-select-group"></ul>
										</div>
									</li>
								</ul>
								<div class="condition-button-area">
									<div class="condition-left">
										<button type="button" class="js-filter-reset condition-reset">
											초기화</button>
									</div>
									<div class="condition-right">
										<button class="js-filter-cancel condition-button cancel">취소</button>
										<button class="js-filter-search condition-button search">검색</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="rightTopMenu" class="top-btns">
					<button type="button" id="organizationTopButton"
						class="btn-organization js-mouseover
            js-button-tooltip"
						mouseover-text="조직도" style="display: none;">
						<i class="icon-organization"></i>
					</button>
					<button type="button" id="chattingTopButton"
						class="btn-chatting js-mouseover
            js-button-tooltip"
						mouseover-text="채팅">
						<i class="icon-chatting"></i> <i id="chatTopCount"
							class="label-chat d-none" style="display: none;">0</i>
					</button>
					<button type="button" id="alarmTopButton"
						class="btn-alarm js-mouseover
            js-button-tooltip"
						mouseover-text="알림">
						<i class="icon-alarm"></i> <i id="alarmTopCount"
							class="label-alarm" style="display: none">0</i>
					</button>
					<button type="button" id="accountTopButton" class="btn-profile">
						<span id="ProfileImg" class="profile-area"
							style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></span>
					</button>
				</div>
				<ul id="acconutModal" class="modal-account d-none">
					<li class="user-area">
						<p class="js-profile user-img"
							style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></p>
						<div class="user-info">
							<strong class="js-user-name js-mouseover">cyr</strong> <span
								class="js-version">게스트 버전</span> <span>이용중</span>
						</div>
					</li>
					<!--
            <li class="user-status">
                <i class="icon-status"></i>
                상태 변경
            </li> -->
					<li id="topProfile" class="user-profile"><i
						class="icons-person-3"></i> 내 프로필</li>
					<li id="mySettingOpenBtn"><i class="icons-set"></i> 환경설정</li>
					<li id="desktopDownloadBtn" class="download-desktop"><i
						class="icons-donwload"></i> <span class="tooltip-square">데스크탑
							버전(설치형) 다운로드</span> PC 앱 다운로드</li>
					<li id="logoutBtn"><i class="icons-logout"></i> 로그아웃</li>
					<li id="miniOpenBtn" style="display: none">
						<button type="button" class="menu-popup-item">
							<i class="icon-my"></i> MINI-FLOW
						</button>
					</li>
					<li id="prevVersionBtn" class="flow-switch">
						<button>
							<i></i>이전버전으로 돌아가기
						</button>
					</li>
				</ul>
			</header>
		</div>

		<div id="mainBodyWrap" class="main-body-wrap">

			<div id="inviteEmployeeLayer" class="flow-all-background-1"
				style="display: none;">
				<div class="flow-project-make-1">
					<div class="flow-project-make-2">
						<div id="firstInvitePopup"
							class="js-invite-employee-layer popup-notice-employee"
							style="display: none">
							<div class="contents">
								<strong class="tit">직원 초대</strong> <a
									class="close-invite-layer-btn js-close-btn" href="#"><em></em></a>
								<p class="txt">플로우에서 직원들과 협업을 시작해보세요.</p>
								<img src="flow-renewal/assets/images/invite_url.png">
								<div class="url-area">
									<span class="invite-url js-link-text"></span>
									<button id="copyLinkBtn" type="button" class="copy-url-button">
										링크 복사</button>
								</div>
								<a id="otherInviteBtn" class="other-invite">다른 방법으로 초대하기
									(이메일, 엑셀 등록)</a>
							</div>
							<div id="popupBottom" class="bottom">
								<div id="notViewToday" class="check-box">
									<input type="checkbox" id="chk3"> <label for="chk3"></label>
									오늘 하루 다시 보지 않기
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 왼쪽 메뉴 -->
			<div id="leftArea" class="main-header-1">

				<!--
     *** 클래스 left-btn-filter 디폴트값 open
     *** 클릭 이벤트 시 클래스 close로 변경
     *** 클릭 이벤트 시 span 텍스트 닫기로 변경
     -->
				<a href="#" id="leftFilterBtn" class="left-btn-filter open d-none"
					style="display: none;"> <i class="icon-filter"></i> <span>열기</span>
				</a>


				<!--
     *** 클래스 left-task 디폴트값 active
     *** left-btn-filter 클릭 이벤트 시 left-task 클래스 active 삭제
     *** left-filter 클래스 active 추가
     -->
				<div id="leftTask" class="left-task active">
					<div class="logo-area">
						<a class="js-logo logo-box">
							<h1 class="logo-1">
								<img src="flow-renewal/assets/images/flow_logo.png"
									alt="flow" srcset="">
							</h1>
						</a>
					</div>
					<a href="#" class="js-left-menu">
						<div id="projectMakeButton" class="new-project-1">
							<div class="button-suport-1"></div>
							새 프로젝트
						</div>
					</a>
					<ul id="leftMenuUl" class="menu-group js-left-menu mgt-20">
						<li data-code="main" class="left-menu-item flow-active"><a
							href="#"> <i class="ico-home"></i>내 프로젝트 <em
								id="leftProjectHomeCount"
								class="js-project-home-count project-total-count d-none"
								style="display: none;">0</em>
						</a></li>
						<li data-code="open" class="left-menu-item d-none"
							style="display: none;"><a href="#"> <i
								class="ico-search"></i>회사 공개 프로젝트
						</a></li>
						<li data-code="nokeep" class="left-menu-item d-none"><a
							href="#"><i class="ico-not-kept"></i>미분류</a></li>
						<li data-code="unread" class="left-menu-item d-none"><a
							href="#"><i class="ico-letter"></i>미확인 <em
								id="unreadProjectHomeCount"
								class="js-project-home-count project-total-count d-none"
								style="display: none;">0</em> </a></li>
						<li data-code="star" class="left-menu-item d-none"><a
							href="#"><i class="ico-favorite"></i>즐겨찾기</a></li>
						<li data-code="hidden" class="left-menu-item d-none"><a
							href="#"><i class="ico-hide"></i>숨김</a></li>
						<li class="js-project-more-button left-menu-item"
							data-code="project-more"><a href="#"> <i
								class="ico-more"></i>더보기
						</a>
							<ul
								class="js-project-more-layer check-menu-popup left-more-menu d-none">
								<li>
									<button data-code="nokeep" type="button" class="left-menu-item">
										<i class="ico-not-kept"></i>미분류
									</button>
								</li>
								<li>
									<button data-code="unread" type="button" class="left-menu-item">
										<i class="ico-letter"></i>미확인 <em id="unreadProjectHomeCount"
											class="js-project-home-count project-total-count d-none"
											style="display: none;">0</em>
									</button>
								</li>
								<li>
									<button data-code="star" type="button" class="left-menu-item">
										<i class="ico-favorite"></i>즐겨찾기
									</button>
								</li>
								<li>
									<button type="button" data-code="hidden" class="left-menu-item">
										<i class="ico-hide"></i>숨김
									</button>
								</li>
							</ul></li>
					</ul>
					<ul id="leftScroll" class="menu-accordion-group scroll-mask">
						<li>
							<div class="menu-accordion-button active left-menu-item"
								data-code="collect-more">
								모아보기<i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li data-code="task" class="left-menu-item"><a href="#"><i
											class="ico-task"></i>전체 업무 </a></li>
									<li data-code="gantt" class="left-menu-item" id="leftMenuGantt"
										style="display: block;"><a href="#"><i
											class="ico-ganttchart"></i>간트차트</a></li>
									<li data-code="schd" class="left-menu-item"><a href="#"><i
											class="ico-schedule"></i>캘린더</a></li>
									<li data-code="file" class="left-menu-item"><a href="#"><i
											class="ico-filebox"></i>파일함</a></li>
									<li data-code="bookmark" class="left-menu-item"><a
										href="#"><i class="ico-bookmark"></i>북마크</a></li>
									<li data-code="mention" class="left-menu-item"><a href="#"><i
											class="ico-mention"></i>나를 언급</a></li>
									<li data-code="mypost" class="left-menu-item"><a href="#"><i
											class="ico-my-write"></i>내 게시물</a></li>
								</ul>
							</div>
						</li>
						<li class="d-none" style="display: block;">
							<div id="RecentProjectButton"
								class="menu-accordion-button left-menu-item active"
								data-code="recent-project-more">
								최근 업데이트 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul id="RecentProjectUl" class="menu-accordion-list d-none"
									style="display: block;">
									<li class="recent-project-item" data-project-srno="1072161"
										data-color-code="2">
										<div class="squre-type color-code-2 ">
											<div class=""></div>
										</div> <span class="js-mouseover ellipsis" mouseover-text="1:1 문의하기">1:1
											문의하기</span>
									</li>

									<li class="recent-project-item" data-project-srno="1072160"
										data-color-code="0">
										<div class="squre-type color-code-0 ">
											<div class=""></div>
										</div> <span class="js-mouseover ellipsis"
										mouseover-text="플로우 이용 가이드">플로우 이용 가이드</span>
									</li>
								</ul>

								<!-- active 추가시 접기로 단어 변경 -->
							</div>
						</li>
						<li>
							<div id="allLabelLeftButton"
								class="menu-accordion-button left-menu-item active"
								data-code="label-more" data-select-label-srno=""
								data-select-label-name="">
								프로젝트 폴더
								<button class="js-label-add label-add-button">
									<i class="ico-plus"></i>
								</button>
								<i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul id="allLabelUl"
									class="menu-accordion-list d-none ui-sortable"
									style="display: block;">
									<li id="label-1" label-srno="1" class="label-item "><i
										class="ico-label"></i> <span
										class="js-label-name js-mouseover ellipsis"
										mouseover-text="마케팅">마케팅</span> <a href="#"
										class="js-label-setting-button flow-dash-three">
											<div></div>
											<div></div>
											<div></div>
									</a></li>

									<li id="label-2" label-srno="2" class="label-item "><i
										class="ico-label"></i> <span
										class="js-label-name js-mouseover ellipsis"
										mouseover-text="디자인">디자인</span> <a href="#"
										class="js-label-setting-button flow-dash-three">
											<div></div>
											<div></div>
											<div></div>
									</a></li>

									<li id="label-3" label-srno="3" class="label-item "><i
										class="ico-label"></i> <span
										class="js-label-name js-mouseover ellipsis"
										mouseover-text="엔지니어링">엔지니어링</span> <a href="#"
										class="js-label-setting-button flow-dash-three">
											<div></div>
											<div></div>
											<div></div>
									</a></li>
								</ul>
							</div>
						</li>
					</ul>
					<div
						class="js-label-setting-layer setting-popup flow-small-layer-1 cursor-pointer"
						style="display: none">
						<div class="label-edit flow-name-size">
							<i></i><a href="#"><span>수정</span></a>
						</div>
						<div class="label-delete flow-dash-icon">
							<i></i><a href="#"><span>삭제</span></a>
						</div>
					</div>
					<ul id="leftBottomUl" class="menu-group admin">
						<li data-code="invite-member"
							class="d-none js-invite-employee-button left-menu-item"
							style="display: none;"><a href="#"><i class="ico-invite"></i>직원
								초대</a></li>
						<li data-code="manager-admin" class="d-none left-menu-item"
							style="display: none;"><a href="#"><i class="ico-admin"></i>어드민</a>
						</li>
						<li data-code="service-upgrade" class="d-none left-menu-item"
							style="display: block;"><a href="#"> <span
								class="ico-flow"><span class="path1"></span><span
									class="path2"></span><span class="path3"></span><span
									class="path4"></span><span class="path5"></span><span
									class="path6"></span><span class="path7"></span><span
									class="path8"></span></span>서비스 업그레이드
						</a></li>
					</ul>
				</div>

				<div id="leftFilter" class="left-filter">
					<div class="logo-area">
						<a class="js-logo logo-box">
							<h1 class="logo-1">
								<img src="flow-renewal/assets/images/flow_logo.png"
									alt="flow" srcset="">
							</h1>
						</a>
					</div>
					<!-- 전체 업무 -->
					<ul id="allTaskFilter"
						class="menu-accordion-group scroll-mask js-left-filter-ul d-none"
						style="display: none;">
						<li id="taskGroupFilter" class="js-filter-type"
							filter-type="radio">
							<div
								class="js-accordion-button menu-accordion-button active left-menu-item">
								업무 구분 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" filter-gb="1">
											<p>
												<i class="js-common-radio"></i> <span>내 업무</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" filter-gb="2">
											<p>
												<i class="js-common-radio"></i> <span>요청한 업무</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text on"
											filter-gb="3">
											<p>
												<i class="js-common-radio all-checked"></i> <span>전체</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li id="taskStatusFilter" class="js-filter-type"
							filter-type="check">
							<div
								class="js-accordion-button menu-accordion-button left-menu-item">
								상태 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											status-filter="0">
											<p>
												<i class="js-search-checkbox all-checked"></i> <span
													class="state request">요청</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											status-filter="1">
											<p>
												<i class="js-search-checkbox"></i> <span
													class="state progress">진행</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											status-filter="4">
											<p>
												<i class="js-search-checkbox"></i> <span
													class="state feedback">피드백</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											status-filter="2">
											<p>
												<i class="js-search-checkbox"></i> <span
													class="state completion">완료</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											status-filter="3">
											<p>
												<i class="js-search-checkbox"></i> <span class="state hold">보류</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li id="taskPriorityFilter" class="js-filter-type"
							filter-type="check">
							<div
								class="js-accordion-button menu-accordion-button left-menu-item">
								우선순위 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											priority-filter="3">
											<p>
												<i class="js-search-checkbox all-checked"></i> <span
													class="rank emergency">긴급</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											priority-filter="2">
											<p>
												<i class="js-search-checkbox"></i> <span class="rank high">높음</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											priority-filter="1">
											<p>
												<i class="js-search-checkbox"></i> <span class="rank normal">보통</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											priority-filter="0">
											<p>
												<i class="js-search-checkbox"></i> <span class="rank low">낮음</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											priority-filter="4">
											<p>
												<i class="js-search-checkbox"></i> <span class="rank empty">없음</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li id="taskStartDateFilter" class="js-filter-type"
							filter-type="radio">
							<div
								class="js-accordion-button menu-accordion-button left-menu-item">
								시작일 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text on"
											start-gb-filter="0">
											<p>
												<i class="js-common-radio all-checked"></i> <span>전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											start-gb-filter="1">
											<p>
												<i class="js-common-radio"></i> <span>오늘</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											start-gb-filter="2">
											<p>
												<i class="js-common-radio"></i> <span>이번 주</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											start-gb-filter="3">
											<p>
												<i class="js-common-radio"></i> <span>이번 달</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											start-gb-filter="4">
											<p>
												<i class="js-common-radio"></i> <span>미정</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li id="taskEndDateFilter" class="js-filter-type"
							filter-type="radio">
							<div
								class="js-accordion-button menu-accordion-button left-menu-item">
								마감일 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text on"
											end-gb-filter="0">
											<p>
												<i class="js-common-radio all-checked"></i> <span>전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											end-gb-filter="5">
											<p>
												<i class="js-common-radio"></i> <span>지연</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											end-gb-filter="1">
											<p>
												<i class="js-common-radio"></i> <span>오늘</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											end-gb-filter="2">
											<p>
												<i class="js-common-radio"></i> <span>이번 주</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											end-gb-filter="3">
											<p>
												<i class="js-common-radio"></i> <span>이번 달</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											end-gb-filter="4">
											<p>
												<i class="js-common-radio"></i> <span>미정</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item js-extend-task-filter d-none">
										<div
											class="js-filter-button extend-task-check-text seach-check-text"
											end-gb-filter="6">
											<p>
												<i class="js-common-radio"></i> <span>기간설정</span>
											</p>
										</div>
										<div class="extend-task-calendar com-calendar d-none">
											<div class="search-filter-group">
												<div class="search-filter-item js-search-pickr-layer"
													data-code="thirdMonth">
													<div
														class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box active flatpickr-input"
														readonly="readonly">
														<span></span><input type="hidden" value=""> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
													<div
														class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
														<span></span><input type="hidden" value=""> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li id="taskEditFilter"
							class="js-filter-type js-extend-task-filter d-none"
							filter-type="radio">
							<div
								class="js-accordion-button menu-accordion-button left-menu-item">
								수정일 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text on">
											<p>
												<i class="js-common-radio all-checked"></i> <span>전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text">
											<p>
												<i class="js-common-radio"></i> <span>오늘</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text">
											<p>
												<i class="js-common-radio"></i> <span>이번 주</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text">
											<p>
												<i class="js-common-radio"></i> <span>이번 달</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div
											class="js-filter-button extend-task-check-text seach-check-text">
											<p>
												<i class="js-common-radio"></i> <span>기간설정</span>
											</p>
										</div>
										<div class="extend-task-calendar com-calendar d-none">
											<div class="search-filter-group">
												<div class="search-filter-item js-search-pickr-layer"
													data-code="thirdMonth">
													<div
														class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box active flatpickr-input"
														readonly="readonly">
														<span></span><input type="hidden" value=""> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
													<div
														class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
														<span></span><input type="hidden" value=""> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<!-- // 전체 업무 -->

					<!-- 전체 일정 -->
					<ul id="calendarFilter"
						class="js-left-filter-ul menu-accordion-group scroll-mask d-none"
						style="display: none;">
						<li>
							<div
								class="menu-accordion-button active left-menu-item js-left-filter-item">
								일정 <i class="ico-arrow"></i>
							</div>
							<div id="scheduleFilter" class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="0,1">
											<p>
												<i class="js-common-radio"></i> <span>전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="1">
											<p>
												<i class="js-common-radio"></i> <span>내 일정</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="0">
											<p>
												<i class="js-common-radio"></i> <span>등록한 일정</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="-1">
											<p>
												<i class="js-common-radio"></i> <span>선택안함</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div
								class="menu-accordion-button active left-menu-item js-left-filter-item">
								업무 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul id="taskFilter" class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="2">
											<p>
												<i class="js-common-radio"></i> <span>전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="0">
											<p>
												<i class="js-common-radio"></i> <span>내 업무</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="1">
											<p>
												<i class="js-common-radio"></i> <span>요청한 업무</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" gubun="-1">
											<p>
												<i class="js-common-radio"></i> <span>선택안함</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<!-- // 전체 일정 -->

					<!-- 전체 파일 -->
					<ul id="fileFilter"
						class="js-left-filter-ul menu-accordion-group scroll-mask d-none"
						style="display: none;">
						<li>
							<div
								class="js-accordion-button menu-accordion-button active left-menu-item">
								파일종류 <i class="ico-arrow"></i>
							</div>
							<div class="menu-accordion">
								<ul class="menu-accordion-list">
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="TOTAL">
											<p>
												<i class="js-common-radio all-checked"></i> <span
													class="file all">전체</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="CLOUD">
											<p>
												<i class="js-common-radio"></i> <span class="file cloud">클라우드</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" file-type="PDF">
											<p>
												<i class="js-common-radio"></i> <span class="file pdf">PDF</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="WORD">
											<p>
												<i class="js-common-radio"></i> <span class="file word">워드</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="EXCEL">
											<p>
												<i class="js-common-radio"></i> <span class="file excel">엑셀</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" file-type="HWP">
											<p>
												<i class="js-common-radio"></i> <span class="file hwp">한글</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" file-type="PPT">
											<p>
												<i class="js-common-radio"></i> <span
													class="file power-point">파워포인트</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" file-type="IMG">
											<p>
												<i class="js-common-radio"></i> <span class="file image">이미지</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="MEDIA">
											<p>
												<i class="js-common-radio"></i> <span
													class="file music-media">음악・동영상</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="HTML">
											<p>
												<i class="js-common-radio"></i> <span class="file html">HTML</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text"
											file-type="AUTOCAD">
											<p>
												<i class="js-common-radio"></i> <span class="file cad">CAD</span>
											</p>
										</div>
									</li>
									<li class="left-menu-item">
										<div class="js-filter-button seach-check-text" file-type="ZIP">
											<p>
												<i class="js-common-radio"></i> <span class="file zip">압축파일</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<!-- // 전체 파일 -->
				</div>
			</div>

			<div id="recentProjectItem" class="js-left-menu"
				style="display: none">
				<li class="recent-project-item" data-project-srno="{project-srno}"
					data-color-code="{color-code}">
					<div class="squre-type color-code-{color-code} {new}">
						<div class="{badge-display}"></div>
					</div> <span class="js-mouseover ellipsis" mouseover-text="{title}">{title}</span>
				</li>
			</div>

			<div id="joinProjectItem" class="js-left-menu" style="display: none">
				<dd id="project-{project-srno}" project-srno="{project-srno}"
					class="join-project-item">
					<a href="#">
						<div class="squre-type-1">
							<div class="squre-round-s"></div>
						</div> {project-title}
					</a>
				</dd>
			</div>

			<div id="labelItem" class="js-left-menu" style="display: none">
				<li id="label-{label-number}" label-srno="{label-number}"
					class="label-item {active}"><i class="ico-label"></i> <span
					class="js-label-name js-mouseover ellipsis"
					mouseover-text="{label-name}">{label-name}</span> <a href="#"
					class="js-label-setting-button flow-dash-three">
						<div></div>
						<div></div>
						<div></div>
				</a></li>
			</div>

			<div id="labelSelectItem" class="d-none">
				<li class="label-item" data-label-kind="{COLABO_FLD_KIND}"
					data-label-srno="{COLABO_FLD_SRNO}" data-label-ico="{ICO_CODE}">
					<div class="label-set-item">
						<span class="label-item-text ellipsis">{COLABO_FLD_NM}</span> <a
							href="#" class="js-check-label {FLOW_CONTENT_CHECK}"></a>
					</div>
				</li>
			</div>

			<div class="main-container">
				<div id="newUpdate" class="post-update-button-area d-none"
					style="display: none;">
					<button type="button" class="post-update-button">새 글 업데이트</button>
				</div>

				<div id="searchResult" class="all-search-section d-none"
					style="display: none;">
					<div id="topSettingBar" class="main-header">
						<div class="title-1" style="display: block">
							"<em id="searchWord"></em>" 검색 결과
						</div>
						<button id="searchResultClose" type="button" class="close-button">
							<span class="blind">닫기</span>
						</button>
					</div>
					<div class="project-detail-top clearfix">
						<ul id="searchTab" class="project-detail-menu">
							<li class="js-tab-item active" data-code="total"><a>전체</a></li>
							<li class="js-tab-item" data-code="project"><a>프로젝트</a></li>
							<li class="js-tab-item" data-code="post"><a>글 · 댓글</a></li>
							<li class="js-tab-item" data-code="file"><a>파일</a></li>
						</ul>
					</div>
					<div class="all-search-container">
						<div id="searchEventArea" class="all-search-content scroll-mask">
							<div id="projectSearchArea" class="search-result-group ">
								<div class="search-title-area">
									<span class="search-result-title">프로젝트</span> <span
										id="projectSearchCount" class="search-result-count"></span>
								</div>
								<ul id="projectSearchResult"
									class="scroll-mask all-seach-list-type-1"></ul>
								<button id="projectSearchMore" type="button"
									class="js-search-more search-result-more" data-code="project">더보기
								</button>
							</div>
							<div id="postSearchArea" class="search-result-group">
								<div class="search-title-area">
									<span class="search-result-title">글 · 댓글</span> <span
										id="postSearchCount" class="search-result-count"></span>
								</div>
								<ul id="postSearchResult"
									class="scroll-mask all-seach-list-type-1"></ul>
								<button id="postSearchMore" type="button"
									class="js-search-more search-result-more" data-code="post">
									더보기</button>
							</div>
							<div id="fileSearchArea" class="search-result-group">
								<div class="search-title-area">
									<span class="search-result-title">파일</span> <span
										id="fileSearchCount" class="search-result-count"></span>
								</div>
								<ul id="fileSearchResult"
									class="scroll-mask all-seach-list-type-1"></ul>
								<button id="fileSearchMore" type="button"
									class="js-search-more search-result-more" data-code="file">
									더보기</button>
							</div>
						</div>
						<div id="searchFilter" class="all-search-filter"
							data-search-area-code="IN_TONG">
							<form action="">
								<fieldset>
									<legend class="blind">Search Form</legend>
									<dl class="search-filter-group">
										<dt>검색 필터</dt>
										<dd class="search-filter-item js-search-pickr-layer">
											<p>검색기간</p>
											<div
												class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
												<span></span><input type="hidden"> <label
													class="filter-date-label"><i class="icon-date"></i></label>
											</div>
											<div
												class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
												<span></span><input type="hidden"> <label
													class="filter-date-label"><i class="icon-date"></i></label>
											</div>
										</dd>
										<dd
											class="js-project-name-search-filter d-none search-filter-item">
											<p>프로젝트</p>
											<div class="filter-input-box">
												<input class="" placeholder="프로젝트명 입력" type="text">
											</div>
										</dd>
										<dd
											class="js-register-name-search-filter d-none search-filter-item">
											<p>작성자</p>
											<div class="filter-input-box">
												<input class="" placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)"
													type="text">
											</div>
										</dd>
										<dd
											class="js-participant-name-search-filter d-none search-filter-item">
											<p>참여자</p>
											<div class="filter-input-box">
												<input class="" placeholder="참여자 입력 (여러명 입력시, 콤마로 구분)"
													type="text">
											</div>
										</dd>
										<dd
											class="js-tmpl-type-search-filter d-none search-filter-item">
											<p>대상</p>
											<ul class="target-select-group"></ul>
										</dd>
										<dd
											class="js-file-type-search-filter d-none search-filter-item">
											<p>파일종류</p>
											<ul class="target-select-group"></ul>
										</dd>
									</dl>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<div id="projectSearchResultItem" class="d-none">
					<li class="project-search-item js-search-item" data-code="project"
						colabo_srno="{COLABO_SRNO}">
						<div class="search-project color-code-{BG_COLOR_CD}"></div> <a
						href="#" class="js-star-button">
							<div class="js-star-icon seach-star-type-1 {unstar_class}"></div>
					</a> <a href="#" class="search-tit"> <em class="seach-text-type-1">{TTL}</em>
					</a>
					</li>
				</div>
				<div id="postSearchResultItem" class="d-none">
					<li class="post-search-item js-search-item" data-code="post"
						colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
						<i class="icon-post-type {post_class}"></i>
						<div class="search-sub-text-wrap">
							<a href="#" class="search-text-type-3 contents-tit">
								<p>
									<span class="post-name-txt">{post_name}</span>{contents}
								</p>
							</a>
							<p class="search-text-type-3 contents-project">
								<span class="search-name ellipsis">{RGSR_NM}</span> <span
									class="date">{date}</span><em class="project-title ellipsis"><i
									class="seach-type-2"></i>{TTL}</em>
							</p>
						</div>

					</li>
				</div>
				<div id="fileSearchResultItem" class="d-none">
					<li class="file-search-item js-search-item" data-code="file"
						colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}"
						use_intt_id="{USE_INTT_ID}" atch_srno="{ATCH_SRNO}"
						rand_key="{RAND_KEY}" file_type="{FILE_TYPE}"
						orcp_file_nm="{data_file_name}" file_size="{FILE_SIZE}"
						file_strg_path="{FILE_STRG_PATH}" img_path="{FILE_STRG_PATH}"
						thum_img_path="{THUM_IMG_PATH}" height="{HEIGHT}" width="{WIDTH}"
						rgsr_nm="{RGSR_NM}" rgsn_dttm="{RGSN_DTTM}"><i
						class="icon-file-type {file_class}"></i>
						<div class="search-sub-text-wrap">
							<a href="#" class="search-text-type-3 contents-tit">
								<p>
									{ORCP_FILE_NM}<em class="file-size-txt">{size}</em>
								</p>
							</a>
							<p class="search-text-type-3 contents-project">
								<span class="search-name ellipsis">{RGSR_NM}</span> <span
									class="date">{date}</span><em class="project-title ellipsis"><i
									class="seach-type-2"></i>{TTL}</em>
							</p>
						</div>
						<button type="button" class="js-download all-search-download">
							<i></i> <span>다운로드</span>
						</button></li>
				</div>
				<div id="allPostItem" class="d-none">
					<li id="allPosts-{COLABO_COMMT_SRNO}"
						class="js-all-post-item post-search-item post-list-wrapper"
						tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
						<div class="fixed-kind">
							<i class="icons-{post-gb}"></i> <span class="post-type">{post-name}</span>
						</div>
						<div class="search-sub-text-wrap">
							<div class="contents-cmt">
								<p class="search-text-type-3 contents-tit">{first-contents}</p>
								<div class="post-list comment" {remark-display}="">
									<i class="icons-comment2"></i> <span
										class="js-post-comment-count">{REMARK_CNT}</span>
								</div>
							</div>
							<p class="search-text-type-3 contents-project">
								<em class="ellipsis"><i class="seach-type-2"></i>{COLABO_TTL}</em>
							</p>
						</div>
						<div class="post-list-right">
							<div class="post-list name">{name}</div>
							<div class="post-list date">{date}</div>
							<!--
            <div class="fixed-value">
                <span class="state request" {todo-display}>{TODO_DONE_PERCENT}</span>
                <span class="js-task-state state {status-code}" {task-display}>{status}</span>
                <div class="date-time" {schedule-display}>
                    <em class="date">{start-date}</em>
                    <span>{start-time}</span>
                </div>
            </div>
            -->
						</div>
					</li>
				</div>
				<div id="allPostSearchItem" class="d-none">
					<li class="js-all-post-item post-search-item js-search-item"
						tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
						<i class="icon-post-type {post-gb}"></i>
						<div class="search-sub-text-wrap">
							<a href="#" class="search-text-type-3 contents-tit">
								<p>
									<span class="post-type">{post-name}</span>{first-contents}
								</p>
							</a>
							<p class="search-text-type-3 contents-project">
								<span class="search-name ellipsis">{name}</span> <span
									class="date">{date}</span><em class="project-title ellipsis"><i
									class="icons-project-1"></i>{COLABO_TTL}</em>
							</p>
						</div>

					</li>
				</div>









				<div id="totalProjectEditBar" class="top-banner-1 top-select"
					style="display: none">
					<div class="top-banner-2">
						<ul id="totalEditButton" class="total-edit-group">
							<li class="edit-button color"><a href="#"
								class="top-banner-icon-type-1"> <em></em>색상 설정
							</a></li>
							<li class="edit-button label"><a href="#"
								class="top-banner-icon-type-2"> <em></em>프로젝트 폴더 설정
							</a></li>
							<li class="edit-button push"><a href="#"
								class="top-banner-icon-type-3"> <em></em>알림 설정
							</a></li>
							<li class="edit-button hidden js-hidden"><a href="#"
								class="top-banner-icon-type-4"> <em></em>숨김
							</a></li>
							<li class="edit-button hidden js-cancel-hidden"><a href="#"
								class="top-banner-icon-type-4"> <em></em>숨김 취소
							</a></li>
						</ul>
						<div id="totalEditSelect" class="menu-text-popup-1">
							<span class="select-count"></span> <em class="select-clear">선택취소</em>
						</div>
					</div>
					<a href="#" id="editBarCloseButton"
						class="main-container-close-button-1"></a>
				</div>

				<div id="topSettingBar" class="main-header">
					<div id="mainTop" class="title-1 d-none" data-code="main">내 프로젝트</div>
					
					<span id="allCollectionCount"
						class="js-collection-total-count js-collection-count top-task-num"></span>

					<div id="projectHomeTop" class="main-sub-header">
						<div class="home-menu clearfix">
							<div class="home-menu-left">
								<a href="#">
									<div id="BoardTypeButton"
										class="menu-select-icon-type-1 type-button js-mouseover on"
										mouseover-text="바둑판형"></div>
								</a> <a href="#">
									<div id="ListTypeButton"
										class="menu-select-icon-type-2 type-button js-mouseover"
										mouseover-text="리스트형"></div>
								</a>
							</div>
							<div class="home-menu-right">
								<a href="#" id="projectOrderButton"
									class="js-project-order-button project-order-button">
									<div id="projectOrderList"
										class="js-project-order-layer menu-popup-layer-1"
										style="display: none;">
										<ul class="menu-popup-t-1">
											<li class="order-item" code="0"><i></i><span>최신
													순(글/댓글)</span></li>
											<li class="order-item" code="1"><i></i><span>내가
													작성한 순 (글/댓글)</span></li>
											<li class="order-item" code="2"><i></i><span>오름차순(ㄱ~ㅎ)</span></li>
											<li class="order-item" code="3"><i></i><span>내림차순
													(ㅎ~ㄱ)</span></li>
										</ul>
										<ul class="menu-popup-t-2">
											<li class="filter-item" code="0"><i></i><span>내가
													참여중인 프로젝트</span></li>
											<li class="filter-item" code="1"><i></i><span>내가
													관리자인 프로젝트</span></li>
										</ul>
									</div> <i class="menu-select-icon-type-3"></i>
									<div class="menu-select-icon-type-4-text">정렬</div>
								</a> <a href="#" id="totalProjectEditButton"
									class="project-edit-button">
									<div class="menu-select-icon-type-4"></div> <span
									class="menu-select-icon-type-4-text">설정</span>
								</a>
							</div>
						</div>
					</div>
					<div id="detailTop" class="project-detail title-1 d-none">
						<div class="project-detail-header">
							<div class="project-color-area">
								<i id="projectColor" class="project-color color-code-2"></i>
							</div>
							<div class="project-header-group">
								<div class="project-title-area">
									<div class="project-option-area">
										<button id="projectStar" class="bookmark-button unstar">
											<span class="blind">즐겨찾기</span>
										</button>
										<button id="detailSettingTopButton" class="set-btn">
											<span></span> <span></span> <span></span>
										</button>
										<div id="detailSettingLayer" class="project-setup-wrap"
											style="display: none">
											<div class="project-setup-header">
												<span>프로젝트 번호</span> <em id="detailSettingProjectSrno"></em>
											</div>
											<ul id="detailSettingGroup" class="setup-group">
												<li id="detailSettingColorBtn"><a href="#"> <i
														class="icon-set-color"></i>색상 설정
												</a></li>
												<li id="detailSettingLabelBtn"><a href="#"> <i
														class="icon-set-label"></i>프로젝트 폴더 설정
												</a></li>
												<li id="detailSettingPushAlarmBtn"><a href="#"> <i
														class="icon-set-alarm"></i>알림 설정
												</a></li>
												<li id="detailSettingHideBtn"><a id="hideText" href="#">
														<i class="icon-set-hide"></i>
												</a></li>
												<li id="detailSettingProjectExitBtn"><a href="#"> <i
														class="icon-set-out"></i>프로젝트 나가기
												</a></li>
												<li id="detailSettingProjectUpdateBtn"><a href="#">
														<i class="icon-set-modify"></i>프로젝트 수정
												</a></li>
												<li id="detailSettingProjectDeleteBtn"><a href="#">
														<i class="icon-set-delete"></i>프로젝트 삭제
												</a></li>
											</ul>
										</div>
									</div>
									<h3 id="projectTitle"
										class="project-title ellipsis js-mouseover" mouseover-text=""></h3>
									<ul class="project-status-group">
										<li id="lockIcon" class="d-none"><i
											class="sprite-detail icon-locked js-icon-locked"><span
												class="blind">관리자 승인 필요</span></i>
											<div class="tooltip-square">
												<em class="tooltip-title">관리자 승인 필요</em>
												<p class="tooltip-text">프로젝트 관리자의 승인 후 참여가 가능한 프로젝트입니다.</p>
											</div></li>
										<li id="companyIcon" class="d-none"><i
											class="sprite-detail icon-company js-icon-company"><span
												class="blind">회사 프로젝트</span></i>
											<div class="tooltip-square">
												<em class="tooltip-title">회사 프로젝트</em>
												<p class="tooltip-text">회사 직원 모두가 자동 참여되는 프로젝트로 임의로 참여자를
													내보내거나 외부 직원을 초대할 수 없습니다.</p>
											</div></li>
										<li id="openProjIcon" class="d-none"><i
											class="sprite-detail icon-open-project js-icon-open-project"><span
												class="blind">회사 공개 프로젝트</span></i>
											<div class="tooltip-square">
												<em class="tooltip-title">회사 공개 프로젝트</em>
												<p class="tooltip-text">우리 회사 직원이라면 누구나 직접 참여를 요청할 수
													있습니다.</p>
											</div></li>
										<li id="unalarmIcon" class="d-none"><i
											class="sprite-detail icon-unalarm js-icon-un-alarm"><span
												class="blind">푸시 알림 OFF</span></i>
											<div class="tooltip-square">
												<em class="tooltip-title">푸시 알림 OFF</em>
												<p class="tooltip-text">휴대폰 푸시 또는 브라우저에 알림이 가지 않습니다.
													프로젝트 [알림 설정]메뉴에서 변경할 수 있습니다.</p>
											</div></li>
										<li style="display: none"><i class="icons-public"></i></li>
										<li id="" style="display: none"><span
											class="icon-out-display">외부</span></li>
									</ul>
								</div>
								<div class="project-description">
									<p id="projectContents" class="description-text">...</p>
									<div class="tooltip-square"></div>
								</div>
							</div>
						</div>
						<button id="openInviteLayerBtn" type="button"
							class="project-invite-button color-type-1">
							<i class="icons-invite"></i>초대하기
						</button>
					</div>
				</div>
				
				<div id="mainContent" class="main-content scroll-mask"
					scroll-direction="0">

					<div id="projectHomeLayer" class="project-home-wrap"
						style="display: block;">
						<div class="small-style-wrap">
							<div id="joinArea" style="display: none">
								<a href="#" id="joinProjectTopButton"
									class="content-group join-list-wr"> <span>가입요청</span><strong
									class="badge-count">0</strong>
									<div class="givc-ico-1 down"></div>
								</a>
								<div id="joinProjectLayer" class="popup-group-1"
									style="display: none">
									<div class="group-header"></div>
									<div class="content-group-1">
										<span>가입요청</span><strong class="badge-count">0</strong>
										<div class="givc-ico-1"></div>
									</div>
									<ul id="joinProjectUl"></ul>
								</div>
							</div>
							<div class="section-wrap">
								<div id="BoardArea" class="project-board-wr"
									style="display: block;">
									<div class="section-1">
										<ul id="projectBoardUl" class="project-group clearfix">
											<div
												class="section-2 middle-line js-project-section js-label-section">
												<p class="project-class join">참여중</p>
											</div>
											<li id="project-1072161"
												class="project-item ui-state-default" label-srnos=""
												project-srno="1072161"><a href="#">
													<div class="flow-content-ct project-badge"
														style="display: none" data="">0</div>
													<button class="edit-check flow-content-chk"
														style="display: none"></button>
													<div class="color-code left-menu-type-1 color-code-2"
														data-color="2"></div>
													<div class="left-menu-type-con">
														<div
															class="project-star flow-content-star flow-content-star-un"></div>
														<div class="flow-content-txt project-ttl">1:1 문의하기</div>
														<div class="flow-content-b-c">
															<div class="flow-content-hm-txt">
																<i class="icons-person-2"></i>
															</div>
															<span class="member-cnt">2</span>
															<div class="flow-content-fl-r">
																<div
																	class="project-stat-ico flow-content-jms-ico js-mouseover"
																	mouseover-text="관리자 승인 필요" style="display: none"
																	data=""></div>
																<div
																	class="project-stat-ico flow-content-bl-ico js-mouseover"
																	mouseover-text="푸시 알림 OFF" style="display: none"
																	data=""></div>
																<div
																	class="project-stat-ico icon-open-project js-mouseover"
																	mouseover-text="회사 공개 프로젝트" style="display: none"
																	data=""></div>
																<div class="project-stat-ico icon-company js-mouseover"
																	mouseover-text="회사 프로젝트" style="display: none" data=""></div>
															</div>
														</div>
													</div>
											</a></li>


											<li id="project-1072160"
												class="project-item ui-state-default" label-srnos=""
												project-srno="1072160"><a href="#">
													<div class="flow-content-ct project-badge"
														style="display: none" data="">0</div>
													<button class="edit-check flow-content-chk"
														style="display: none"></button>
													<div class="color-code left-menu-type-1 color-code-0"
														data-color="0"></div>
													<div class="left-menu-type-con">
														<div
															class="project-star flow-content-star flow-content-star-un"></div>
														<div class="flow-content-txt project-ttl">플로우 이용 가이드</div>
														<div class="flow-content-b-c">
															<div class="flow-content-hm-txt">
																<i class="icons-person-2"></i>
															</div>
															<span class="member-cnt">2</span>
															<div class="flow-content-fl-r">
																<div
																	class="project-stat-ico flow-content-jms-ico js-mouseover"
																	mouseover-text="관리자 승인 필요" style="display: none"
																	data=""></div>
																<div
																	class="project-stat-ico flow-content-bl-ico js-mouseover"
																	mouseover-text="푸시 알림 OFF" style="display: none"
																	data=""></div>
																<div
																	class="project-stat-ico icon-open-project js-mouseover"
																	mouseover-text="회사 공개 프로젝트" style="display: none"
																	data=""></div>
																<div class="project-stat-ico icon-company js-mouseover"
																	mouseover-text="회사 프로젝트" style="display: none" data=""></div>
															</div>
														</div>
													</div>
											</a></li>
										</ul>
									</div>
								</div>
								<div id="ListArea" class="project-list-wr" style="display: none">
									<ul id="projectListUl"></ul>
								</div>
							</div>

							<ul id="allProjectBoardItem" style="display: none">
								{label}
								<li id="project-{project-number1}"
									class="project-item ui-state-default"
									label-srnos="{label_srnos}" project-srno="{project-number1}">
									<a href="#">
										<div class="flow-content-ct project-badge" {badge-display}="">{badge-count}</div>
										<button class="edit-check flow-content-chk"
											style="display: none"></button>
										<div
											class="color-code left-menu-type-1 color-code-{color-code}"
											data-color="{color-code}"></div>
										<div class="left-menu-type-con">
											<div class="project-star flow-content-star {star-class}"></div>
											<div class="flow-content-txt project-ttl">{title}</div>
											<div class="flow-content-b-c">
												<div class="flow-content-hm-txt">
													<i class="icons-person-2"></i>
												</div>
												<span class="member-cnt">{member-count}</span>
												<div class="flow-content-fl-r">
													<div
														class="project-stat-ico flow-content-jms-ico js-mouseover"
														mouseover-text="관리자 승인 필요" {manager-display}=""></div>
													<div
														class="project-stat-ico flow-content-bl-ico js-mouseover"
														mouseover-text="푸시 알림 OFF" {push-display}=""></div>
													<div
														class="project-stat-ico icon-open-project js-mouseover"
														mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
													<div class="project-stat-ico icon-company js-mouseover"
														mouseover-text="회사 프로젝트" {company-display}=""></div>
												</div>
											</div>
										</div>
									</a>
								</li>
							</ul>
							
							<ul id="allProjectListItem" style="display: none">
								{label}
								<li id="project-{project-number2}"
									class="project-item ui-state-default"
									project-srno="{project-number2}" label-srnos="{label_srnos}">
									<a href="#">
										<button class="edit-check flow-content-chk d-none"></button>
										<div
											class="color-code flow-content-list flow-content-po-t color-code-{color-code}"
											data-color="{color-code}"></div>
										<div class="project-star flow-content-po-t {star2-class}"></div>
										<span class="project-ttl">{title}</span>
										<div class="flow-content-hm-txt">
											<i class="icons-person-2"></i>
										</div> <span class="member-cnt">{member-count}</span> <strong
										class="project-badge" {badge-display}="">{badge-count}</strong>
										<div class="flow-content-fl-r">
											<div
												class="project-stat-ico flow-content-jms-ico js-mouseover"
												mouseover-text="관리자 승인 필요" {manager-display}=""></div>
											<div
												class="project-stat-ico flow-content-bl-ico js-mouseover"
												mouseover-text="푸시 알림 OFF" {push-display}=""></div>
											<div class="project-stat-ico icon-open-project js-mouseover"
												mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
											<div class="project-stat-ico icon-company js-mouseover"
												mouseover-text="회사 프로젝트" {company-display}=""></div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
					
					<div id="allCollectView" class="all-collect-wrap d-none"
						style="height: 100%; display: none;">
						<div id="mainScroll"
							class="main-scroll padding-left-right-30 type3">

							<div class="allTaskLayer full-width small-style-wrap-2 d-none"
								style="display: none;">
								<div class="btns-wr">
									<div class="project-search-area all-file-header-type-3">
										<div class="project-search">
											<i class="icons-search"></i> <input type="text"
												placeholder="업무명 또는 업무번호를 검색하세요!" autocomplete="off"
												maxlength="20"
												class="js-task-search-input project-search-input">
											<button type="button"
												class="js-task-detail-search-button search-set-button">옵션</button>
											<div
												class="js-task-detail-search-layer name-type-seach-popup d-none"
												data-search-area-code="IN_TASK"
												style="top: 40px; left: 0px;">

												<p>옵션</p>
												<div class="detail-search-conditions">
													<ul class="conditions-group">
														<li class="js-project-name-search-filter">
															<div class="condition-cell title">프로젝트</div>
															<div class="condition-cell">
																<input type="text" placeholder="프로젝트명 입력">
															</div>
														</li>
														<li class="js-register-name-search-filter">
															<div class="condition-cell title">작성자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-participant-name-search-filter d-none">
															<div class="condition-cell title">담당자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-period-type-search-filter">
															<div class="condition-cell title">검색기간</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-tmpl-type-search-filter">
															<div class="condition-cell title">대상</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-file-type-search-filter"
															style="display: none">
															<div class="condition-cell title">파일종류</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
													</ul>
													<div class="condition-button-area">
														<div class="condition-left">
															<button type="button"
																class="js-filter-reset condition-reset">초기화</button>
														</div>
														<div class="condition-right">
															<button class="js-filter-cancel condition-button cancel">취소</button>
															<button class="js-filter-search condition-button search">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<ul class="btns-area">
										<li>
											<button id="excelDownButton"
												class="task-nav-button task-excel-down">
												<i class="icon-excel-download"></i> 다운로드
											</button>
										</li>
										<li>
											<button
												class="js-task-add-btn collect-add-button task-add-button"></button>
										</li>
										<li>
											<button id="taskSettingButton"
												class="task-nav-button task-setting js-alltask-setting-button">
												<i class="icon-setting"></i>
											</button>
											<ul class="js-alltask-setting-layer menu-popup-wrap">
												<li id="bundleButton"
													class="js-task-bundle-button js-bundle-list"><span>묶어보기</span><i
													class="icons-right-3"></i></li>
												<li id="sortPopupButton"><span>보기 설정</span></li>
											</ul>
											<ul id="bundleLayer"
												class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
												<li class="js-bundle-li" view-gb="0">없음</li>
												<li class="js-bundle-li" view-gb="1">상태</li>
												<li class="js-bundle-li" view-gb="2">마감일</li>
												<li class="js-bundle-li" view-gb="3">프로젝트</li>
											</ul>
										</li>
									</ul>

								</div>
								<section class="all-task-seaction">
									<h3 class="blind">모든업무 목록</h3>
									<div id="taskSortHeader" class="all-task-header"></div>
									<ul id="taskContentUl"
										class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask"></ul>
								</section>
							</div>




							<div class="allFileLayer full-width small-style-wrap-2 d-none"
								style="display: none;">
								<div class="btns-wr">
									<div class="project-search-area all-file-header-type-3">
										<div class="project-search">
											<i class="icons-search"></i> <input type="text"
												placeholder="파일명을 검색해주세요!" autocomplete="off" maxlength="20"
												class="js-file-search-input project-search-input">
											<button type="button"
												class="js-file-detail-search-button search-set-button">옵션</button>
											<div
												class="js-file-detail-search-layer name-type-seach-popup d-none"
												data-search-area-code="IN_FILE"
												style="top: 40px; left: 0px;">

												<p>옵션</p>
												<div class="detail-search-conditions">
													<ul class="conditions-group">
														<li class="js-project-name-search-filter">
															<div class="condition-cell title">프로젝트</div>
															<div class="condition-cell">
																<input type="text" placeholder="프로젝트명 입력">
															</div>
														</li>
														<li class="js-register-name-search-filter">
															<div class="condition-cell title">작성자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-participant-name-search-filter d-none">
															<div class="condition-cell title">담당자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-period-type-search-filter">
															<div class="condition-cell title">검색기간</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-tmpl-type-search-filter">
															<div class="condition-cell title">대상</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-file-type-search-filter"
															style="display: none">
															<div class="condition-cell title">파일종류</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
													</ul>
													<div class="condition-button-area">
														<div class="condition-left">
															<button type="button"
																class="js-filter-reset condition-reset">초기화</button>
														</div>
														<div class="condition-right">
															<button class="js-filter-cancel condition-button cancel">취소</button>
															<button class="js-filter-search condition-button search">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="btns-area">
										<button id="allFileMoveButton">
											<i class="icon-move"></i> 이동
										</button>
										<button id="fileDownloadButton">
											<i class="icon-download"></i> 다운로드
										</button>
										<button id="allFileDeleteButton" class="task-setting">
											<i class="icon-delete"></i> 폴더 삭제
										</button>
										<button id="addFolder"
											class="js-file-add-button collect-add-button"></button>
										<a href="#" id="changeListTypeButton"
											class="js-view-change-button">
											<div
												class="js-all-file-type all-file-header-right-icon-type-5">
												<span class="tooltip-square">리스트형</span>
											</div>
										</a> <a href="#" id="changeBoardTypeButton"
											class="js-view-change-button all-file-board-margin">
											<div
												class="js-all-file-type all-file-header-right-icon-type-4">
												<span class="tooltip-square">바둑판형</span>
											</div>
										</a>
									</div>
								</div>
								<div id="fileItemArea" class="all-file-area board">
									<div id="allFileSort"
										class="js-sort-layer all-file-list-setup-type-1">
										<div id="fileUploadSort"
											class="js-sort-file all-file-list-setup-1 check"
											data-sort-code="EDTR_DTTM">
											<span>최근 업로드순</span><em></em>
										</div>
										<div id="fileNameSort"
											class="js-sort-file all-file-list-setup-1"
											data-sort-code="ITEM_NM">
											<span>파일명 순</span><em></em>
										</div>
									</div>
									<ul id="fileItemUlHead" class="js-sort-layer file-item-head">
										<li>
											<div class="js-sort-file all-file-list-name-type-1"
												data-sort-code="ITEM_NM">
												<span class="all-file-list-sort ">파일명<em></em></span>
											</div>
											<div class="js-sort-file all-file-list-name-type-4"
												data-sort-code="SIZE">
												<span class="all-file-list-sort">용량<em></em></span>
											</div>
											<div class="js-sort-file all-file-list-name-type-2"
												data-sort-code="RGSR_NM">
												<span class="all-file-list-sort">등록자<em></em></span>
											</div>
											<div class="js-sort-file all-file-list-name-type-3 check"
												data-sort-code="EDTR_DTTM">
												<span class="all-file-list-sort">등록일시<em></em></span>
											</div>
											<div
												class="js-sort-file all-file-list-sort all-file-list-name-type-5"></div>
										</li>
									</ul>
									<ul id="fileLayerUl"
										class="js-file-list-layer layer-scroll file-select-wrap scroll-mask"></ul>
								</div>
								<div id="fileLayerProjectMenu"
									class="all-file-header-left-type-1"></div>

								<ul id="boardTypeFileItem" style="display: none;">
									<li
										class="js-file-board js-selectable ui-selectee {download_yn}"
										rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
										width="{WIDTH}" height="{HEIGHT}"
										orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}"
										colabo_commt_srno="{COLABO_COMMT_SRNO}" img_path="{IMG_PATH}"
										atch_srno="{ATCH_SRNO}" use_intt_id="{USE_INTT_ID}"
										rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}"
										file_type="{FILE_TYPE}" file_size="{data_file_size}"
										rgsn_dttm="{rgsn_dttm}" file_index_code="{file_index_code}">
										<a href="#" class="all-file-type-check position-check-fix"></a>
										<a href="#"
										class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
										<a href="#">
											<div class="file-extension {view_type_class_name}"
												{thumbnail_url}=""></div>
									</a>
										<div
											class="all-file-name all-file-round-bottom-section-1 js-mouseover"
											mouseover-text="{mouseover-text}">{ORCP_FILE_NM}</div>
									</li>
								</ul>
								<ul id="boardTypeFolderItem" style="display: none;">
									<li class="js-file-board js-folder js-selectable ui-selectee"
										colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
										up-file-fld-srno="{up-file-fld-srno}"><a href="#"
										class="all-file-type-check position-check-fix"></a> <a
										href="#"
										class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
										<a href="#">
											<div class="file-extension {view-type-class-name}"></div>
									</a>
										<div class="all-file-name all-file-round-bottom-section-1">{file-name}</div>
									</li>
								</ul>

								<ul id="listTypeFileItem" style="display: none;">
									<li
										class="js-file-list js-selectable ui-selectee {download_yn}"
										rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
										width="{WIDTH}" height="{HEIGHT}"
										orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}"
										colabo_commt_srno="{COLABO_COMMT_SRNO}"
										atch_srno="{ATCH_SRNO}" img_path="{IMG_PATH}"
										use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}"
										editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}"
										file_size="{data_file_size}" rgsn_dttm="{RGSN_DTTM}"
										file_index_code="{file_index_code}"
										project_title="{PROJECT_TITLE}">
										<div class="all-file-list-name-type-1-1 ellipsis">
											<em class="all-file-type-check"></em>
											<div class="all-file-type-icon-wrap-1">
												<div class="file-extension {view_type_class_name}"></div>
											</div>
											<div class="all-file-name js-mouseover"
												mouseover-text="{mouseover-text}">
												<div class="all-file-file-name">
													<span>{ORCP_FILE_NM}</span>
												</div>
												<div class="all-file-project-title">
													<i class="icons-project-1"></i> {PROJECT_TITLE}
												</div>
											</div>


										</div>

										<div class="all-file-list-name-type-4-1">
											<strong class="js-list-file-size">{file_size}</strong>
										</div>
										<div class="all-file-list-name-type-2-1">
											<strong class="js-mouseover" mouseover-text="{RGSR_NM}">{RGSR_NM}</strong>
										</div>
										<div class="all-file-list-name-type-3-1">
											<strong class="js-all-file-dttm">{date}</strong>
										</div>
										<div class="js-file-menu all-file-plus-icon-image-type-1"
											style="display: none;"></div>
									</li>
								</ul>
								<ul id="listTypeFolderItem" style="display: none;">
									<li id="list-{folder-key}"
										class="js-file-list js-folder js-selectable ui-selectee"
										colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
										up-file-fld-srno="{up-file-fld-srno}">
										<div class="all-forder-list-name-type-1-1">
											<em class="all-file-type-check"></em>
											<div class="all-file-type-icon-wrap-1">
												<div class="file-extension {view-type-class-name}"></div>
											</div>
											<span class="all-file-name">{file-name}</span>
										</div>
										<div class="all-file-list-name-type-4-1">
											<strong>-</strong>
										</div>
										<div class="all-file-list-name-type-2-1">
											<strong>{rgsr-nm}</strong>
										</div>
										<div class="all-file-list-name-type-3-1">
											<strong>{rgsn-dttm}</strong>
										</div>
										<div class="js-file-menu all-file-plus-icon-image-type-1"
											style="display: none;"></div>
									</li>
								</ul>

								<div id="fileMenuPopupItem" style="display: none;">
									<div
										class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
										<a href="#" id="downloadFile" class="js-file-menu-button">
											<div class="download-file-button">
												<i></i> <span>다운로드</span>
											</div>
										</a> <a href="#" id="viewerFile" class="js-file-menu-button">
											<div class="viewer-file-button">
												<i></i> <span>열기</span>
											</div>
										</a> <a href="#" id="moveFile" class="js-file-menu-button">
											<div class="flow-name-move">
												<i></i> <span>이동</span>
											</div>
										</a> <a href="#" id="nameChange" class="js-file-menu-button">
											<div class="flow-name-size">
												<i></i> <span>이름 변경</span>
											</div>
										</a> <a href="#" id="deleteFolder" class="js-file-menu-button">
											<div class="flow-dash-icon">
												<i></i> <span>삭제</span>
											</div>
										</a> <a href="#" id="detailFileView" class="js-file-menu-button">
											<div class="detail-file-button">
												<i></i> <span>상세보기</span>
											</div>
										</a>
									</div>
								</div>

								<ul id="fileLayerTitleItem" class="js-file-items-class">
									<a href="#" class="js-file-header"
										project-srno="{project-srno}" file-fld-srno="{file-fld-srno}">
										<em
										class="flow-content-circle-type-1 project-color {project-color}"
										{project-color-display}=""></em> <span
										class="js-all-file-project-title">{project-title}</span>
									</a>
								</ul>

								<ul id="headerFolderItem" class="js-file-items-class">
									<a href="#" id="folder-{file-fld-srno}" class="js-file-header"
										colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
										folder-depth="{folder-depth}"> <em
										class="all-file-header-left-icon-type-3"></em> <span>{folder-name}</span>
									</a>
								</ul>

								<ul id="headerMoreItem" class="js-file-items-class">
									<a class="js-file-more-button">
										<div id="moreFolderButton"
											class="js-file-header all-file-plus-type-1">
											<span>...</span>
										</div>
										<div id="moreFolderLayer" class="all-file-popup-type-1">
											<ul clss="js-file-more-ul file-more-ul">
												{more-folder-list}
											</ul>
										</div>
									</a>

								</ul>

								<ul id="headerMorePopupLiItme" class="js-file-items-class">
									<li id="{file-fld-srno}"
										class="js-file-header all-file-popup-type-{folder-depth-class}"
										colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
										folder-depth="{folder-depth}"><i></i><em></em><span>{folder-name}</span></li>
								</ul>

								<div id="fileMovePopupItem" class="d-none">
									<div class="flow-all-background-1">
										<div class="flow-project-make-1">
											<div class="flow-project-make-2">
												<div class="flow-project-popup-8 js-file-move-popup">
													<div class="flow-project-header-1">
														<span>이동</span> <a href="#"
															class="js-class-button flow-close-type-1"></a>
													</div>
													<div class="flow-content-type-2">
														<ul id="moveFilePopupUl">
															<li id="movePopupProject"
																class="js-move-file-li file-move-project"
																colabo-srno="{colabo-srno}" file-fld-srno="-1">
																<div class="file-folder-div">
																	<em class="flow-content-circle-type-1 {project-color}"></em>
																	{project-title} <a href="#"
																		class="js-file-move-check check-file-button"></a>
																</div>
															</li>
														</ul>
													</div>
													<div class="flow-pop-button-type-2">
														<a href="#">
															<div class="js-class-button flow-pop-sub-button-1">취소</div>
														</a> <a href="#">
															<div class="js-move-file-success flow-pop-sub-button-2">확인</div>
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div id="fileMovePopupLiItem" class="d-none">
									<li
										class="file-folder js-move-file-li {popup-depth-class} {current-folder}"
										colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
										up-file-fld-srno="{up-file-fld-srno}"
										data-depth="{folder-depth}">
										<div class="file-folder-div">
											<i class="js-more-folder {last-fld}"></i> <em></em> <span>{folder-name}</span>
											<a href="#" class="js-file-move-check check-file-button"></a>
										</div>
										<ul></ul>
									</li>
								</div>

								<div id="countLayerItem" class="d-none">
									<div class="js-file-count-layer all-file-alert-type-2">
										<span><span class="js-count-text">{count}</span>개
											파일/폴더를 선택되었습니다.</span><em class="js-all-cancle-button">선택 취소</em>
									</div>
								</div>
							</div>



							<div
								class="allCalendarLayer full-width small-style-wrap-2 d-none"
								style="display: none;">
								<div class="all-schedule">
									<div class="btns-wr">
										<div class="project-search-area all-file-header-type-3">
											<div class="project-search">
												<i class="icons-search"></i> <input type="text"
													placeholder="일정 제목을 검색해주세요!"
													class="js-calendar-search-input project-search-input">
											</div>
										</div>
										<div class="btns-area">

											<button id="scheduleAdd" type="button"
												class="collect-add-button" data-post-code="2"></button>
										</div>
									</div>
									<div class="all-calendar-wrap">
										<!-- calendar -->
										<div id="calendar"
											class="all-calendar all-calendar-nav layer-scroll"></div>
										<!-- calendar-popup -->
									</div>
								</div>
							</div>
						</div>
					</div>



					<div id="openProjectLayer" class="small-style-wrap d-none"
						style="display: none;">
						<div class="open-search-area">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input id="openProjectSearchInput"
										type="text" placeholder="검색어를 입력해주세요"
										class="project-search-input" autocomplete="off" maxlength="50">
									<div id="" class="name-type-seach-popup d-none"
										style="top: 28px; left: 300px;">
										<p>옵션</p>
										<div class="detail-search-conditions">
											<ul class="conditions-group">
												<li class="js-project-name-search-filter">
													<div class="condition-cell title">프로젝트</div>
													<div class="condition-cell">
														<input type="text" placeholder="프로젝트명 입력">
													</div>
												</li>
												<li class="js-register-name-search-filter">
													<div class="condition-cell title">작성자</div>
													<div class="condition-cell">
														<input type="text" placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
													</div>
												</li>
												<li class="js-period-type-search-filter">
													<div class="condition-cell title">검색기간</div>
													<div class="condition-cell">
														<ul class="target-select-group">
															<li><input type="radio" name="period-type"
																id="searchToday" class="radio-input"> <label
																for="searchToday"
																class="js-period-type radio-label-checkbox"
																data-code="today">오늘</label></li>
															<li><input type="radio" name="period-type"
																id="searchOneWeek" class="radio-input"> <label
																for="searchOneWeek"
																class="js-period-type radio-label-checkbox"
																data-code="week"> 7일 </label></li>
															<li><input type="radio" name="period-type"
																id="searchOneMonth" class="radio-input"> <label
																for="searchOneMonth"
																class="js-period-type radio-label-checkbox"
																data-code="month"> 1개월 </label></li>
															<li><input type="radio" name="period-type"
																id="searchThreeMonth" class="radio-input"> <label
																for="searchThreeMonth"
																class="js-period-type radio-label-checkbox"
																data-code="thirdMonth"> 3개월 </label></li>
															<li><input type="radio" name="period-type"
																id="searchSixMonth" class="radio-input"> <label
																for="searchSixMonth"
																class="js-period-type radio-label-checkbox"
																data-code="sixthMonth"> 6개월 </label></li>
															<li><input type="radio" name="period-type"
																id="searchOneYear" class="radio-input"> <label
																for="searchOneYear"
																class="js-period-type radio-label-checkbox"
																data-code="year"> 1년 </label></li>
															<!--
                                        <li>
                                            <input type="radio" name="search-period" id="dateSelect"
                                                   class="radio-input"/>
                                            <label for="dateSelect" class="radio-label-checkbox"></label>
                                            <label class="search-date-select">
                                                <label class="search-date-select delete">
                                                <input
                                                        type="text"
                                                        name="search-period"
                                                        class="flatpickr flatpickr-input"
                                                        placeholder="기간선택"
                                                        readonly="readonly"
                                                />
                                            </label>
                                        </li>
                                        -->
														</ul>
													</div>
												</li>
												<li class="js-tmpl-type-search-filter">
													<div class="condition-cell title">대상</div>
													<div class="condition-cell">
														<ul class="target-select-group">
															<li class="js-total-tmpl-type"><input type="radio"
																name="tmpl-type" id="searchTargetTotalTmplType"
																class="radio-input"> <label
																for="searchTargetTotalTmplType"
																class="js-tmpl-type radio-label-checkbox" data-code="">전체</label>
															</li>
															<li><input type="radio" name="tmpl-type"
																id="searchTargetWrite" class="radio-input"> <label
																for="searchTargetWrite"
																class="js-tmpl-type radio-label-checkbox" data-code="1">글</label>
															</li>
															<li><input type="radio" name="tmpl-type"
																id="searchTargetTask" class="radio-input"> <label
																for="searchTargetTask"
																class="js-tmpl-type radio-label-checkbox" data-code="4">업무</label>
															</li>
															<li><input type="radio" name="tmpl-type"
																id="searchTargetCalendar" class="radio-input"> <label
																for="searchTargetCalendar"
																class="js-tmpl-type radio-label-checkbox" data-code="3">일정</label>
															</li>
															<li><input type="radio" name="tmpl-type"
																id="searchTargetTodo" class="radio-input"> <label
																for="searchTargetTodo"
																class="js-tmpl-type radio-label-checkbox" data-code="2">할
																	일</label></li>
															<li class="js-remark-tmpl-type"><input type="radio"
																name="tmpl-type" id="searchTargetRemark"
																class="radio-input"> <label
																for="searchTargetRemark"
																class="js-tmpl-type radio-label-checkbox" data-code="-1">댓글</label>
															</li>
														</ul>
													</div>
												</li>
											</ul>
											<div class="condition-button-area">
												<div class="condition-left">
													<button type="button"
														class="js-filter-reset condition-reset">초기화</button>
												</div>
												<div class="condition-right">
													<button class="js-filter-cancel condition-button cancel">취소</button>
													<button class="js-filter-search condition-button search">검색</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="main-sub-header">
							<div class="public-project-header">
								<button id="leftArrowButton" type="button"
									class="public-arrow-btn left" style="display: none"></button>
								<button id="rightArrowButton" type="button"
									class="public-arrow-btn right" style="display: none">
								</button>
								<div class="public-list-area">
									<ul id="openProjectCategory" class="public-list-group">
										<li>
											<button type="button" class="public-project-item active">전체</button>
										</li>
									</ul>
								</div>
							</div>
							<div class="section-wrap">
								<div class="section-2">
									<div class="public-title-area">
										<span id="openProjectCategoryName"
											class="public-project-title"></span><em
											id="openProjectTotalCount" class="public-count"></em>
									</div>
								</div>
								<div id="openProjectScroll" class="layer-scroll type4">
									<ul id="openProjectList"
										class="section-list-1 project-list-setion"></ul>
								</div>
							</div>
						</div>
					</div>
					<div id="categoryFirstItem" class="d-none">
						<li value="ALL" class="category-item">
							<button type="button" class="public-project-item active">전체</button>
						</li>
					</div>
					<div id="categoryItem" class="d-none">
						<li value="{category-srno}" class="category-item">
							<button type="button" class="public-project-item">{category-name}</button>
						</li>
					</div>
					<div id="projectItem" class="d-none">
						<li value="{project-srno}" class="project-item"
							data-project-info="{project-info}"><a href="#">
								<div class="project-wr">
									<span class="project-ttl">{project-name}</span>
									<div class="flow-content-hm-txt">
										<i class="icons-person-2"></i>
									</div>
									<em class="participant-count"> {project-participant} </em> <em
										class="manager">{project-manager}</em> <em
										class="manager-name">{project-manager-name}</em> <em
										class="badge-join" {join-display}="">참여중</em>
									<p class="project-ttl-sub">{CNTN}</p>
								</div>
						</a></li>
					</div>


					<div id="allPostsLayer" class="me-post-wrap layer-scroll d-none"
						style="display: none;">
						<div class="my-search-area">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input id="allPostsSearchInput"
										type="text" placeholder="검색어를 입력해주세요!"
										class="project-search-input" autocomplete="off" maxlength="50">
									<button id="allPostsDetailSearchTopButton" type="button"
										class="search-set-button">옵션</button>
									<div id="allPostsDetailSearchLayer"
										class="name-type-seach-popup d-none"
										data-search-area-code="IN_POSTS" style="top: 40px; left: 0px;">
										<p>옵션</p>
										<div class="detail-search-conditions">
											<ul class="conditions-group">
												<li class="js-project-name-search-filter">
													<div class="condition-cell title">프로젝트</div>
													<div class="condition-cell">
														<input type="text" placeholder="프로젝트명 입력">
													</div>
												</li>
												<li class="js-register-name-search-filter">
													<div class="condition-cell title">작성자</div>
													<div class="condition-cell">
														<input type="text" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)">
													</div>
												</li>
												<li class="js-period-type-search-filter">
													<div class="condition-cell title">검색기간</div>
													<div class="condition-cell">
														<ul class="target-select-group"></ul>
													</div>
												</li>
												<li class="js-tmpl-type-search-filter">
													<div class="condition-cell title">대상</div>
													<div class="condition-cell">
														<ul class="target-select-group"></ul>
													</div>
												</li>
											</ul>
											<div class="condition-button-area">
												<div class="condition-left">
													<button type="button"
														class="js-filter-reset condition-reset">초기화</button>
												</div>
												<div class="condition-right">
													<button class="js-filter-cancel condition-button cancel">취소</button>
													<button class="js-filter-search condition-button search">검색</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<button type="button"
									class="js-search-back-button js-all-posts-back result-back-button d-none">
									<i class="icons-back"></i> 돌아가기
								</button>
							</div>
						</div>
						<div class="small-style-wrap-2">
							<div class="feed-content me-content">
								<div class="search-title-area">
									<span id="allPostsFilterTitle" class="search-result-title">전체</span>
									<span id="postCount" class="count-number">0</span>
									<!--전체 + 갯수 카운트-->
									<span class="js-filter-reset filter-reset">취소</span>
									<!--필터링 후 취소 버튼 노출 -->
									<div id="allPostsFilter" class="me-filter-area"
										style="display: block;">
										<button type="button"
											class="js-all-posts-filter-button filter-button">필터
										</button>
										<ul
											class="js-all-posts-filter-layer check-menu-popup my-popup"
											style="display: none; position: absolute; top: 24px; right: 0;">
											<li>
												<div class="js-tmpl-type js-total-tmpl-type check-menu-item"
													data-code="">전체</div>
											</li>
											<li>
												<div class="js-tmpl-type check-menu-item" data-code="1">글</div>
											</li>
											<li>
												<div class="js-tmpl-type check-menu-item" data-code="4">업무</div>
											</li>
											<li>
												<div class="js-tmpl-type check-menu-item" data-code="3">일정</div>
											</li>
											<li>
												<div class="js-tmpl-type check-menu-item" data-code="2">할
													일</div>
											</li>
											<li>
												<div
													class="js-tmpl-type js-remark-tmpl-type check-menu-item"
													data-code="-1">댓글</div>
											</li>
										</ul>
									</div>
								</div>
								<ul id="myPostContentUl"
									class="all-seach-list-type-1 post-group scroll-mask"></ul>
							</div>
						</div>


						<div
							class="js-post-search-result all-search-section d-none me-post-wrap"
							data-search-area-code="">
							<div class="all-search-container">
								<div class="all-search-content">
									<div
										class="js-result-input-area project-search-area all-file-header-type-3"
										style="margin-top: 20px; display: none">
										<div class="project-search">
											<i class="icons-search"></i> <input type="text"
												placeholder="검색어를 입력해주세요!" class="project-search-input"
												autocomplete="off" maxlength="50">
											<button id="projectDetailSearchTopButton" type="button"
												class="js-detail-search-filter-button search-set-button">옵션</button>
											<div
												class="js-detail-search-filter-layer name-type-seach-popup d-none"
												style="top: 28px; left: 0px;">

												<p>옵션</p>
												<div class="detail-search-conditions">
													<ul class="conditions-group">
														<li class="js-project-name-search-filter">
															<div class="condition-cell title">프로젝트</div>
															<div class="condition-cell">
																<input type="text" placeholder="프로젝트명 입력">
															</div>
														</li>
														<li class="js-register-name-search-filter">
															<div class="condition-cell title">작성자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-participant-name-search-filter d-none">
															<div class="condition-cell title">담당자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-period-type-search-filter">
															<div class="condition-cell title">검색기간</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-tmpl-type-search-filter">
															<div class="condition-cell title">대상</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-file-type-search-filter"
															style="display: none">
															<div class="condition-cell title">파일종류</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
													</ul>
													<div class="condition-button-area">
														<div class="condition-left">
															<button type="button"
																class="js-filter-reset condition-reset">초기화</button>
														</div>
														<div class="condition-right">
															<button class="js-filter-cancel condition-button cancel">취소</button>
															<button class="js-filter-search condition-button search">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<button type="button"
										class="js-search-back-button js-detail-back result-back-button d-none">
										<i class="icons-back"></i> 돌아가기
									</button>
									<div id="postSearchArea" class="search-result-group">
										<div class="search-title-area">
											<span class="search-result-title">전체</span> <span
												id="allPostsSearchCount"
												class="js-search-post-count search-result-count"
												style="display: inline-block"></span>
										</div>
										<ul id="allPostsSearchUl"
											class="js-search-post-ul all-seach-list-type-1 scroll-mask"></ul>
									</div>
								</div>
								<div class="all-search-filter">
									<form action="">
										<fieldset>
											<legend class="blind">통합검색 필터 폼</legend>
											<dl class="search-filter-group">
												<dt>검색 필터</dt>
												<dd class="search-filter-item js-search-pickr-layer">
													<p>검색기간</p>
													<div
														class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
														<span></span><input type="hidden"> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
													<div
														class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
														<span></span><input type="hidden"> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
												</dd>
												<dd
													class="js-project-name-search-filter d-none search-filter-item">
													<p>프로젝트</p>
													<div class="filter-input-box">
														<input class="" placeholder="프로젝트명 입력" type="text">
													</div>
												</dd>
												<dd
													class="js-register-name-search-filter d-none search-filter-item">
													<p>작성자</p>
													<div class="filter-input-box">
														<input class="" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)"
															type="text">
													</div>
												</dd>
												<dd
													class="js-participant-name-search-filter d-none search-filter-item">
													<p>참여자</p>
													<div class="filter-input-box">
														<input class="" placeholder="참여자명 입력 (여러명 입력시, 콤마로 구분)"
															type="text">
													</div>
												</dd>
												<dd
													class="js-tmpl-type-search-filter d-none search-filter-item">
													<p>대상</p>
													<ul class="target-select-group"></ul>
												</dd>
											</dl>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</div>










					<div id="detailLayer"
						class="main-sub-header project-detail-wrap d-none"
						style="display: none;">
						<div class="project-detail-top clearfix">
							<ul id="detailTab" class="project-detail-menu">
								<li class="js-tab-item" data-code="home"><a>홈</a></li>
								<li class="js-tab-item" data-code="task"><a>업무</a></li>
								<li class="js-tab-item gantt" data-code="gantt"><a>간트차트</a>
									<span class="tooltip-square">클릭 시, 새 창으로 이동합니다.</span></li>
								<li class="js-tab-item" data-code="calendar"><a>캘린더</a></li>
								<li class="js-tab-item" data-code="file"><a>파일</a></li>
								<!-- <li class="js-tab-item" data-code="history">
                <a>히스토리</a>
            </li> -->
							</ul>

							<div id="projectCollectionCount"
								class="js-collection-count project-num-wrap"
								style="display: none;">
								<span>건수 : </span> <span class="js-collection-total-count"></span>
							</div>

						</div>









						<div
							class="js-post-search-result all-search-section d-none me-post-wrap"
							data-search-area-code="">
							<div class="all-search-container">
								<div class="all-search-content">
									<div
										class="js-result-input-area project-search-area all-file-header-type-3"
										style="margin-top: 20px; display: none">
										<div class="project-search">
											<i class="icons-search"></i> <input type="text"
												placeholder="검색어를 입력해주세요!" class="project-search-input"
												autocomplete="off" maxlength="50">
											<button id="projectDetailSearchTopButton" type="button"
												class="js-detail-search-filter-button search-set-button">옵션</button>
											<div
												class="js-detail-search-filter-layer name-type-seach-popup d-none"
												style="top: 28px; left: 0px;">










												<p>옵션</p>
												<div class="detail-search-conditions">
													<ul class="conditions-group">
														<li class="js-project-name-search-filter">
															<div class="condition-cell title">프로젝트</div>
															<div class="condition-cell">
																<input type="text" placeholder="프로젝트명 입력">
															</div>
														</li>
														<li class="js-register-name-search-filter">
															<div class="condition-cell title">작성자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-participant-name-search-filter d-none">
															<div class="condition-cell title">담당자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-period-type-search-filter">
															<div class="condition-cell title">검색기간</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-tmpl-type-search-filter">
															<div class="condition-cell title">대상</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-file-type-search-filter"
															style="display: none">
															<div class="condition-cell title">파일종류</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
													</ul>
													<div class="condition-button-area">
														<div class="condition-left">
															<button type="button"
																class="js-filter-reset condition-reset">초기화</button>
														</div>
														<div class="condition-right">
															<button class="js-filter-cancel condition-button cancel">취소</button>
															<button class="js-filter-search condition-button search">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<button type="button"
										class="js-search-back-button js-detail-back result-back-button d-none">
										<i class="icons-back"></i> 돌아가기
									</button>
									<div id="postSearchArea" class="search-result-group">
										<div class="search-title-area">
											<span class="search-result-title">전체</span> <span
												id="allPostsSearchCount"
												class="js-search-post-count search-result-count"
												style="display: inline-block"></span>
										</div>
										<ul id="allPostsSearchUl"
											class="js-search-post-ul all-seach-list-type-1 scroll-mask"></ul>
									</div>
								</div>
								<div class="all-search-filter">
									<form action="">
										<fieldset>
											<legend class="blind">통합검색 필터 폼</legend>
											<dl class="search-filter-group">
												<dt>검색 필터</dt>
												<dd class="search-filter-item js-search-pickr-layer">
													<p>검색기간</p>
													<div
														class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
														<span></span><input type="hidden"> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
													<div
														class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
														<span></span><input type="hidden"> <label
															class="filter-date-label"><i class="icon-date"></i></label>
													</div>
												</dd>
												<dd
													class="js-project-name-search-filter d-none search-filter-item">
													<p>프로젝트</p>
													<div class="filter-input-box">
														<input class="" placeholder="프로젝트명 입력" type="text">
													</div>
												</dd>
												<dd
													class="js-register-name-search-filter d-none search-filter-item">
													<p>작성자</p>
													<div class="filter-input-box">
														<input class="" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)"
															type="text">
													</div>
												</dd>
												<dd
													class="js-participant-name-search-filter d-none search-filter-item">
													<p>참여자</p>
													<div class="filter-input-box">
														<input class="" placeholder="참여자명 입력 (여러명 입력시, 콤마로 구분)"
															type="text">
													</div>
												</dd>
												<dd
													class="js-tmpl-type-search-filter d-none search-filter-item">
													<p>대상</p>
													<ul class="target-select-group"></ul>
												</dd>
											</dl>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
						<div id="detailCollectView"
							class="detail-collect-view background-white d-none"
							style="display: none;">
							<div id="mainScroll"
								class="detail-collect-group type3 padding-left-right-30">










								<div class="allTaskLayer full-width small-style-wrap-2 d-none"
									style="display: none;">
									<div class="btns-wr">
										<div class="project-search-area all-file-header-type-3">
											<div class="project-search">
												<i class="icons-search"></i> <input type="text"
													placeholder="업무명 또는 업무번호를 검색하세요!" autocomplete="off"
													maxlength="20"
													class="js-task-search-input project-search-input">
												<button type="button"
													class="js-task-detail-search-button search-set-button">옵션</button>
												<div
													class="js-task-detail-search-layer name-type-seach-popup d-none"
													data-search-area-code="IN_TASK"
													style="top: 40px; left: 0px;">










													<p>옵션</p>
													<div class="detail-search-conditions">
														<ul class="conditions-group">
															<li class="js-project-name-search-filter">
																<div class="condition-cell title">프로젝트</div>
																<div class="condition-cell">
																	<input type="text" placeholder="프로젝트명 입력">
																</div>
															</li>
															<li class="js-register-name-search-filter">
																<div class="condition-cell title">작성자</div>
																<div class="condition-cell">
																	<input type="text"
																		placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
																</div>
															</li>
															<li class="js-participant-name-search-filter d-none">
																<div class="condition-cell title">담당자</div>
																<div class="condition-cell">
																	<input type="text"
																		placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
																</div>
															</li>
															<li class="js-period-type-search-filter">
																<div class="condition-cell title">검색기간</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
															<li class="js-tmpl-type-search-filter">
																<div class="condition-cell title">대상</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
															<li class="js-file-type-search-filter"
																style="display: none">
																<div class="condition-cell title">파일종류</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
														</ul>
														<div class="condition-button-area">
															<div class="condition-left">
																<button type="button"
																	class="js-filter-reset condition-reset">초기화</button>
															</div>
															<div class="condition-right">
																<button class="js-filter-cancel condition-button cancel">취소</button>
																<button class="js-filter-search condition-button search">검색</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<ul class="btns-area">
											<li>
												<button id="excelDownButton"
													class="task-nav-button task-excel-down">
													<i class="icon-excel-download"></i> 다운로드
												</button>
											</li>
											<li>
												<button
													class="js-task-add-btn collect-add-button task-add-button"></button>
											</li>
											<li>
												<button id="taskSettingButton"
													class="task-nav-button task-setting js-alltask-setting-button">
													<i class="icon-setting"></i>
												</button>
												<ul class="js-alltask-setting-layer menu-popup-wrap">
													<li id="bundleButton"
														class="js-task-bundle-button js-bundle-list"><span>묶어보기</span><i
														class="icons-right-3"></i></li>
													<li id="sortPopupButton"><span>보기 설정</span></li>
												</ul>
												<ul id="bundleLayer"
													class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
													<li class="js-bundle-li" view-gb="0">없음</li>
													<li class="js-bundle-li" view-gb="1">상태</li>
													<li class="js-bundle-li" view-gb="2">마감일</li>
													<li class="js-bundle-li" view-gb="3">프로젝트</li>
												</ul>
											</li>
										</ul>

									</div>
									<section class="all-task-seaction">
										<h3 class="blind">모든업무 목록</h3>
										<div id="taskSortHeader" class="all-task-header"></div>
										<ul id="taskContentUl"
											class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask"></ul>
									</section>
								</div>











								<div class="allFileLayer full-width small-style-wrap-2 d-none"
									style="display: none;">
									<div class="btns-wr">
										<div class="project-search-area all-file-header-type-3">
											<div class="project-search">
												<i class="icons-search"></i> <input type="text"
													placeholder="파일명을 검색해주세요!" autocomplete="off"
													maxlength="20"
													class="js-file-search-input project-search-input">
												<button type="button"
													class="js-file-detail-search-button search-set-button">옵션</button>
												<div
													class="js-file-detail-search-layer name-type-seach-popup d-none"
													data-search-area-code="IN_FILE"
													style="top: 40px; left: 0px;">










													<p>옵션</p>
													<div class="detail-search-conditions">
														<ul class="conditions-group">
															<li class="js-project-name-search-filter">
																<div class="condition-cell title">프로젝트</div>
																<div class="condition-cell">
																	<input type="text" placeholder="프로젝트명 입력">
																</div>
															</li>
															<li class="js-register-name-search-filter">
																<div class="condition-cell title">작성자</div>
																<div class="condition-cell">
																	<input type="text"
																		placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
																</div>
															</li>
															<li class="js-participant-name-search-filter d-none">
																<div class="condition-cell title">담당자</div>
																<div class="condition-cell">
																	<input type="text"
																		placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
																</div>
															</li>
															<li class="js-period-type-search-filter">
																<div class="condition-cell title">검색기간</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
															<li class="js-tmpl-type-search-filter">
																<div class="condition-cell title">대상</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
															<li class="js-file-type-search-filter"
																style="display: none">
																<div class="condition-cell title">파일종류</div>
																<div class="condition-cell">
																	<ul class="target-select-group"></ul>
																</div>
															</li>
														</ul>
														<div class="condition-button-area">
															<div class="condition-left">
																<button type="button"
																	class="js-filter-reset condition-reset">초기화</button>
															</div>
															<div class="condition-right">
																<button class="js-filter-cancel condition-button cancel">취소</button>
																<button class="js-filter-search condition-button search">검색</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="btns-area">
											<button id="allFileMoveButton">
												<i class="icon-move"></i> 이동
											</button>
											<button id="fileDownloadButton">
												<i class="icon-download"></i> 다운로드
											</button>
											<button id="allFileDeleteButton" class="task-setting">
												<i class="icon-delete"></i> 폴더 삭제
											</button>
											<button id="addFolder"
												class="js-file-add-button collect-add-button"></button>
											<a href="#" id="changeListTypeButton"
												class="js-view-change-button">
												<div
													class="js-all-file-type all-file-header-right-icon-type-5">
													<span class="tooltip-square">리스트형</span>
												</div>
											</a> <a href="#" id="changeBoardTypeButton"
												class="js-view-change-button all-file-board-margin">
												<div
													class="js-all-file-type all-file-header-right-icon-type-4">
													<span class="tooltip-square">바둑판형</span>
												</div>
											</a>
										</div>
									</div>
									<div id="fileItemArea" class="all-file-area board">
										<div id="allFileSort"
											class="js-sort-layer all-file-list-setup-type-1">
											<div id="fileUploadSort"
												class="js-sort-file all-file-list-setup-1 check"
												data-sort-code="EDTR_DTTM">
												<span>최근 업로드순</span><em></em>
											</div>
											<div id="fileNameSort"
												class="js-sort-file all-file-list-setup-1"
												data-sort-code="ITEM_NM">
												<span>파일명 순</span><em></em>
											</div>
										</div>
										<ul id="fileItemUlHead" class="js-sort-layer file-item-head">
											<li>
												<div class="js-sort-file all-file-list-name-type-1"
													data-sort-code="ITEM_NM">
													<span class="all-file-list-sort ">파일명<em></em></span>
												</div>
												<div class="js-sort-file all-file-list-name-type-4"
													data-sort-code="SIZE">
													<span class="all-file-list-sort">용량<em></em></span>
												</div>
												<div class="js-sort-file all-file-list-name-type-2"
													data-sort-code="RGSR_NM">
													<span class="all-file-list-sort">등록자<em></em></span>
												</div>
												<div class="js-sort-file all-file-list-name-type-3 check"
													data-sort-code="EDTR_DTTM">
													<span class="all-file-list-sort">등록일시<em></em></span>
												</div>
												<div
													class="js-sort-file all-file-list-sort all-file-list-name-type-5"></div>
											</li>
										</ul>
										<ul id="fileLayerUl"
											class="js-file-list-layer layer-scroll file-select-wrap scroll-mask"></ul>
									</div>
									<div id="fileLayerProjectMenu"
										class="all-file-header-left-type-1"></div>

									<ul id="boardTypeFileItem" style="display: none;">
										<li
											class="js-file-board js-selectable ui-selectee {download_yn}"
											rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
											width="{WIDTH}" height="{HEIGHT}"
											orcp_file_nm="{DATA_ORCP_FILE_NM}"
											colabo_srno="{COLABO_SRNO}"
											colabo_commt_srno="{COLABO_COMMT_SRNO}" img_path="{IMG_PATH}"
											atch_srno="{ATCH_SRNO}" use_intt_id="{USE_INTT_ID}"
											rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}"
											file_type="{FILE_TYPE}" file_size="{data_file_size}"
											rgsn_dttm="{rgsn_dttm}" file_index_code="{file_index_code}">
											<a href="#" class="all-file-type-check position-check-fix"></a>
											<a href="#"
											class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
											<a href="#">
												<div class="file-extension {view_type_class_name}"
													{thumbnail_url}=""></div>
										</a>
											<div
												class="all-file-name all-file-round-bottom-section-1 js-mouseover"
												mouseover-text="{mouseover-text}">{ORCP_FILE_NM}</div>
										</li>
									</ul>
									<ul id="boardTypeFolderItem" style="display: none;">
										<li class="js-file-board js-folder js-selectable ui-selectee"
											colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
											up-file-fld-srno="{up-file-fld-srno}"><a href="#"
											class="all-file-type-check position-check-fix"></a> <a
											href="#"
											class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
											<a href="#">
												<div class="file-extension {view-type-class-name}"></div>
										</a>
											<div class="all-file-name all-file-round-bottom-section-1">{file-name}</div>
										</li>
									</ul>

									<ul id="listTypeFileItem" style="display: none;">
										<li
											class="js-file-list js-selectable ui-selectee {download_yn}"
											rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
											width="{WIDTH}" height="{HEIGHT}"
											orcp_file_nm="{DATA_ORCP_FILE_NM}"
											colabo_srno="{COLABO_SRNO}"
											colabo_commt_srno="{COLABO_COMMT_SRNO}"
											atch_srno="{ATCH_SRNO}" img_path="{IMG_PATH}"
											use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}"
											editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}"
											file_size="{data_file_size}" rgsn_dttm="{RGSN_DTTM}"
											file_index_code="{file_index_code}"
											project_title="{PROJECT_TITLE}">
											<div class="all-file-list-name-type-1-1 ellipsis">
												<em class="all-file-type-check"></em>
												<div class="all-file-type-icon-wrap-1">
													<div class="file-extension {view_type_class_name}"></div>
												</div>
												<div class="all-file-name js-mouseover"
													mouseover-text="{mouseover-text}">
													<div class="all-file-file-name">
														<span>{ORCP_FILE_NM}</span>
													</div>
													<div class="all-file-project-title">
														<i class="icons-project-1"></i> {PROJECT_TITLE}
													</div>
												</div>


											</div>

											<div class="all-file-list-name-type-4-1">
												<strong class="js-list-file-size">{file_size}</strong>
											</div>
											<div class="all-file-list-name-type-2-1">
												<strong class="js-mouseover" mouseover-text="{RGSR_NM}">{RGSR_NM}</strong>
											</div>
											<div class="all-file-list-name-type-3-1">
												<strong class="js-all-file-dttm">{date}</strong>
											</div>
											<div class="js-file-menu all-file-plus-icon-image-type-1"
												style="display: none;"></div>
										</li>
									</ul>
									<ul id="listTypeFolderItem" style="display: none;">
										<li id="list-{folder-key}"
											class="js-file-list js-folder js-selectable ui-selectee"
											colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
											up-file-fld-srno="{up-file-fld-srno}">
											<div class="all-forder-list-name-type-1-1">
												<em class="all-file-type-check"></em>
												<div class="all-file-type-icon-wrap-1">
													<div class="file-extension {view-type-class-name}"></div>
												</div>
												<span class="all-file-name">{file-name}</span>
											</div>
											<div class="all-file-list-name-type-4-1">
												<strong>-</strong>
											</div>
											<div class="all-file-list-name-type-2-1">
												<strong>{rgsr-nm}</strong>
											</div>
											<div class="all-file-list-name-type-3-1">
												<strong>{rgsn-dttm}</strong>
											</div>
											<div class="js-file-menu all-file-plus-icon-image-type-1"
												style="display: none;"></div>
										</li>
									</ul>

									<div id="fileMenuPopupItem" style="display: none;">
										<div
											class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
											<a href="#" id="downloadFile" class="js-file-menu-button">
												<div class="download-file-button">
													<i></i> <span>다운로드</span>
												</div>
											</a> <a href="#" id="viewerFile" class="js-file-menu-button">
												<div class="viewer-file-button">
													<i></i> <span>열기</span>
												</div>
											</a> <a href="#" id="moveFile" class="js-file-menu-button">
												<div class="flow-name-move">
													<i></i> <span>이동</span>
												</div>
											</a> <a href="#" id="nameChange" class="js-file-menu-button">
												<div class="flow-name-size">
													<i></i> <span>이름 변경</span>
												</div>
											</a> <a href="#" id="deleteFolder" class="js-file-menu-button">
												<div class="flow-dash-icon">
													<i></i> <span>삭제</span>
												</div>
											</a> <a href="#" id="detailFileView" class="js-file-menu-button">
												<div class="detail-file-button">
													<i></i> <span>상세보기</span>
												</div>
											</a>
										</div>
									</div>

									<ul id="fileLayerTitleItem" class="js-file-items-class">
										<a href="#" class="js-file-header"
											project-srno="{project-srno}" file-fld-srno="{file-fld-srno}">
											<em
											class="flow-content-circle-type-1 project-color {project-color}"
											{project-color-display}=""></em> <span
											class="js-all-file-project-title">{project-title}</span>
										</a>
									</ul>

									<ul id="headerFolderItem" class="js-file-items-class">
										<a href="#" id="folder-{file-fld-srno}" class="js-file-header"
											colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
											folder-depth="{folder-depth}"> <em
											class="all-file-header-left-icon-type-3"></em> <span>{folder-name}</span>
										</a>
									</ul>

									<ul id="headerMoreItem" class="js-file-items-class">
										<a class="js-file-more-button">
											<div id="moreFolderButton"
												class="js-file-header all-file-plus-type-1">
												<span>...</span>
											</div>
											<div id="moreFolderLayer" class="all-file-popup-type-1">
												<ul clss="js-file-more-ul file-more-ul">
													{more-folder-list}
												</ul>
											</div>
										</a>

									</ul>

									<ul id="headerMorePopupLiItme" class="js-file-items-class">
										<li id="{file-fld-srno}"
											class="js-file-header all-file-popup-type-{folder-depth-class}"
											colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
											folder-depth="{folder-depth}"><i></i><em></em><span>{folder-name}</span></li>
									</ul>

									<div id="fileMovePopupItem" class="d-none">
										<div class="flow-all-background-1">
											<div class="flow-project-make-1">
												<div class="flow-project-make-2">
													<div class="flow-project-popup-8 js-file-move-popup">
														<div class="flow-project-header-1">
															<span>이동</span> <a href="#"
																class="js-class-button flow-close-type-1"></a>
														</div>
														<div class="flow-content-type-2">
															<ul id="moveFilePopupUl">
																<li id="movePopupProject"
																	class="js-move-file-li file-move-project"
																	colabo-srno="{colabo-srno}" file-fld-srno="-1">
																	<div class="file-folder-div">
																		<em class="flow-content-circle-type-1 {project-color}"></em>
																		{project-title} <a href="#"
																			class="js-file-move-check check-file-button"></a>
																	</div>
																</li>
															</ul>
														</div>
														<div class="flow-pop-button-type-2">
															<a href="#">
																<div class="js-class-button flow-pop-sub-button-1">취소</div>
															</a> <a href="#">
																<div class="js-move-file-success flow-pop-sub-button-2">확인</div>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div id="fileMovePopupLiItem" class="d-none">
										<li
											class="file-folder js-move-file-li {popup-depth-class} {current-folder}"
											colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
											up-file-fld-srno="{up-file-fld-srno}"
											data-depth="{folder-depth}">
											<div class="file-folder-div">
												<i class="js-more-folder {last-fld}"></i> <em></em> <span>{folder-name}</span>
												<a href="#" class="js-file-move-check check-file-button"></a>
											</div>
											<ul></ul>
										</li>
									</div>

									<div id="countLayerItem" class="d-none">
										<div class="js-file-count-layer all-file-alert-type-2">
											<span><span class="js-count-text">{count}</span>개
												파일/폴더를 선택되었습니다.</span><em class="js-all-cancle-button">선택 취소</em>
										</div>
									</div>
								</div>











								<div
									class="allCalendarLayer full-width small-style-wrap-2 d-none"
									style="display: none;">
									<div class="all-schedule">
										<div class="btns-wr">
											<div class="project-search-area all-file-header-type-3">
												<div class="project-search">
													<i class="icons-search"></i> <input type="text"
														placeholder="일정 제목을 검색해주세요!"
														class="js-calendar-search-input project-search-input">
												</div>
											</div>
											<div class="btns-area">



												<button id="scheduleAdd" type="button"
													class="collect-add-button" data-post-code="2"></button>
											</div>
										</div>
										<div class="all-calendar-wrap">
											<!-- calendar -->
											<div id="calendar"
												class="all-calendar all-calendar-nav layer-scroll"></div>
											<!-- calendar-popup -->
										</div>
									</div>
								</div>








								<div
									class="allHistoryLayer full-width small-style-wrap-2 d-none"
									style="display: none;">
									<div class="history-container">
										<div class="project-search-area all-file-header-type-3">
											<div class="project-search">
												<i class="icons-search"></i> <input type="text"
													placeholder="일정 제목을 검색해주세요!"
													class="js-calendar-search-input project-search-input"
													readonly="readonly">
											</div>
										</div>
										<ul class="history-group">
											<li
												class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}"
												colabo_srno="{COLABO_SRNO}"
												colabo_commt_srno="{COLABO_COMMT_SRNO}"
												colabo_remark_srno="{COLABO_REMARK_SRNO}">
												<div class="all-setup-picture-type-1"
													style="background-image: url(flow-renewal/assets/images/profile-default.png)"
													data=""></div> <!-- <div class="all-setup-picture-type-1" {profile}></div> -->
												<div class="all-text-wrap-type-1">
													<div class="all-text-wrap-type-2">
														<i class="{emojiIcon}"></i>{msg}
													</div>
													<div class="all-text-wrap-type-3">{contents}</div>
													<div class="all-text-wrap-type-3">
														<span><em class="all-setup-icon-type-1 {img-yn}"></em>이미지</span><span><em
															class="all-setup-icon-type-2 {file-yn}"></em>파일</span>
													</div>
												</div>
												<div class="all-setup-section-type-1">
													<em>2021-05-11</em>
												</div>
											</li>
										</ul>
									</div>
								</div>

							</div>
						</div>
						<div id="detailTimeline"
							class="project-detail-inner layer-scroll type2"
							style="display: none;">
							<div class="js-detail-wrap-area small-style-wrap">
								<!-- project-detail-container-->
								<section id="postTimeline" class="project-detail-container">
									<div class="project-search-area all-file-header-type-3">
										<div class="project-search">
											<i class="icons-search"></i> <input id="projectSearchInput"
												type="text" placeholder="검색어를 입력해주세요"
												class="project-search-input" autocomplete="off"
												maxlength="50">
											<button id="projectDetailSearchTopButton" type="button"
												class="js-detail-top-search-button search-set-button">
												옵션</button>
											<div id="projectDetailSearchLayer"
												class="name-type-seach-popup d-none"
												data-search-area-code="IN_PROJECT"
												style="top: 38px; left: 0px">










												<p>옵션</p>
												<div class="detail-search-conditions">
													<ul class="conditions-group">
														<li class="js-project-name-search-filter">
															<div class="condition-cell title">프로젝트</div>
															<div class="condition-cell">
																<input type="text" placeholder="프로젝트명 입력">
															</div>
														</li>
														<li class="js-register-name-search-filter">
															<div class="condition-cell title">작성자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-participant-name-search-filter d-none">
															<div class="condition-cell title">담당자</div>
															<div class="condition-cell">
																<input type="text"
																	placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
															</div>
														</li>
														<li class="js-period-type-search-filter">
															<div class="condition-cell title">검색기간</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-tmpl-type-search-filter">
															<div class="condition-cell title">대상</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
														<li class="js-file-type-search-filter"
															style="display: none">
															<div class="condition-cell title">파일종류</div>
															<div class="condition-cell">
																<ul class="target-select-group"></ul>
															</div>
														</li>
													</ul>
													<div class="condition-button-area">
														<div class="condition-left">
															<button type="button"
																class="js-filter-reset condition-reset">초기화</button>
														</div>
														<div class="condition-right">
															<button class="js-filter-cancel condition-button cancel">취소</button>
															<button class="js-filter-search condition-button search">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="project-detail-content">
										<div id="taskReportArea"></div>

										<div id="createPostArea" class="work-design-wrapper">
											<ul id="createPostUl" class="work-design-group">
												<li class="post-filter" data-post-code="1"><i
													class="icons-write2"></i><span>글</span></li>
												<li class="post-filter" data-post-code="4"><i
													class="icons-task"></i><span>업무</span></li>
												<li class="post-filter" data-post-code="3"><i
													class="icons-schedule"></i><span>일정</span></li>
												<li class="post-filter" data-post-code="2"><i
													class="icons-todo"></i><span>할 일</span></li>
											</ul>
											<div class="work-desing-element">
												<p class="work-desing-text">
													<i class="cursor"></i>내용을 입력하세요.
												</p>
												<div class="work-icon-group">
													<i class="icons-file"></i> <i class="icons-picture"></i> <i
														class="icons-map"></i> <i class="icons-tag"></i> <i
														class="icons-mention"></i> <i class="icons-font"></i>
												</div>
											</div>
										</div>

										<!-- 해시태그 -->
										<div id="projectHashtagArea"
											class="detail-section hashtag-section">
											<!--hashtag-section에 active class로 제어  -->
											<ul id="hashtagUl" class="hashtag-group"></ul>
											<button id="hashtagMoreButton" type="button"
												class="hashtag-more-btn d-none">
												<i class="ico-arrow"></i>
											</button>
										</div>
										<!-- //해시태그 -->

									</div>
									<!-- 미확인 -->
									<div id="projectAlarmArea"
										class="detail-section unidentified-alert-section d-none">
										<div class="section-title-area">
											<h4 class="section-title">
												<span>미확인</span> <span id="projectNotReadCount"
													class="section-number alarm"></span>
											</h4>
											<button id="readAllPostBnt" type="button"
												class="read-all-btn">모두읽음</button>
										</div>
										<div class="unidentified-content">
											<!--unidentified-content active 클래스 제어 -->
											<ul id="notReadAlarmUl" class="unidentified-list"></ul>
											<button id="notReadAlarmMore" type="button"
												class="unidentified-more-btn d-none">
												더보기 <span class="blind">더보기</span>
											</button>
										</div>
									</div>
									<!-- //미확인 -->
									<!-- 상단고정 -->
									<div id="projectPinArea"
										class="detail-section fix-section d-none">
										<div class="section-title-area">
											<h4 class="section-title">
												<span>상단고정</span> <span id="projectPinCount"
													class="section-number"></span>
											</h4>
										</div>
										<ul id="pinPostUl" class="pin-list fixed-list"></ul>
									</div>
									<!-- //상단고정 -->

									<!-- 전체피드 -->
									<div id="projectFeedArea" class="detail-section feed-section">
										<div class="section-title-area">
											<h4 id="allPostsFilterTitle" class="section-title">전체</h4>
											<span class="filter-reset js-filter-reset">취소</span>
											<!--필터링 후 취소 버튼 노출 -->
											<div id="feedTypeButton" class="feed-type-area">
												<button type="button"
													class="js-feed-filter-button filter-button">
													<i class="icons-filter"></i> <span>필터</span>
												</button>
												<button type="button" class="feed-type-button card">
													<i class="icons-feed"></i> <span class="tooltip-square">피드형</span>
												</button>
												<button type="button" class="feed-type-button list">
													<i class="icons-list"></i> <span class="tooltip-square">리스트형</span>
												</button>
												<ul class="js-feed-filter-layer check-menu-popup d-none">
													<li>
														<div class="check-menu-item on" data-code="">전체</div>
													</li>
													<li>
														<div class="check-menu-item" data-code="1">글</div>
													</li>
													<li>
														<div class="check-menu-item" data-code="4">업무</div>
													</li>
													<li>
														<div class="check-menu-item" data-code="3">일정</div>
													</li>
													<li>
														<div class="check-menu-item" data-code="2">할 일</div>
													</li>
												</ul>
											</div>
										</div>
										<div class="feed-content">
											<button id="postMoreBtn" type="button" class="more-btn"
												style="display: none">
												<i></i><i></i><i></i>
											</button>
											<ul id="detailUl" class="post-group list"></ul>
										</div>
									</div>
								</section>
								<!-- //project-detail-container-->
								<div class="participants-section">
									<div id="projectParticipants"
										class="project-participants-wrap feed-section">
										<div class="section-title-area">
											<h4 class="section-title">
												<span>참여자</span> <span id="participantCount"></span>
											</h4>
											<div class="feed-type-area">
												<button id="allSendienceBtn" type="button">전체 보기</button>
											</div>
										</div>

										<div id="participantArea"
											class="participants-container d-none">
											<div id="participantScrollArea"
												class="participants-content-group scroll-mask">
												<div id="joinParticipantsArea"
													class="participants-content d-none">
													<span class="participants-title"> <em>가입 신청자</em> <span
														id="joinParticipantsCount" class="number-of-participants"></span>
													</span>
													<ul id="joinParticipantsUl" class="participants-list"></ul>
												</div>
												<ul id="participantsUl" class="participants-list"></ul>
											</div>
											<div class="participants-menu">
												<button class="js-project-chat participant-button">
													<i class="icons-chat small"></i>채팅
												</button>
												<button class="js-video-chat participant-button">
													<i class="icons-video"></i> 화상 회의
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="pinPostItem" class="d-none">
							<li id="pin-{post-srno}" class="js-pin-item"
								data-post-srno="{post-srno}" data-project-srno="{colabo-srno}">
								<a href="#">
									<div class="fixed-kind">
										<i class="icons-{post-gb}"></i> <span>{post-name}</span>
									</div>
									<p class="js-post-title fixed-text {complete-yn}">{title}</p>
									<div class="fixed-value">
										<span class="js-task-state js-todo-state {status-code}">{status}</span>
										<div class="date-time {schedule-yn}">
											<em class="date">{start-date}</em> <span>{start-time}</span>
										</div>
									</div>
							</a>
							</li>
						</div>
						<div id="hashTagItem" class="d-none">
							<li><a href="#none" class="hashtag-item"> <em
									class="hashtag-item-title">{tagName}</em>
									<div class="hashtag-item-text">{refCount}개의 게시물</div>
							</a></li>
						</div>
						<div id="mentionItem" class="d-none">
							<li id="{id}-mention" class="js-mention-item participant-item"
								data-user-id="{id}">
								<div class="post-author">
									<span class="thumbnail size40 radius16" {profile}=""></span>
									<dl class="post-author-info">
										<dt>
											<strong class="author">{name}</strong> <em>{position}</em>
										</dt>
										<dd class="{personal-yn}">
											<strong class="company">{company}</strong> <span class="team">{team}</span>
										</dd>
									</dl>
								</div>
							</li>
						</div>
						<div id="participantItem" class="d-none">
							<li class="js-participant-item" data-id="{worker-id}">
								<div class="post-author">
									<span class="js-participant-profile thumbnail size40 radius16"
										{profile}=""></span>
									<dl class="post-author-info">
										<dt>
											<strong class="js-participant-name author ellipsis">{name}</strong>
											<em class="position ellipsis" {personal-display}="">{position}</em>
										</dt>
										<dd {personal-display}="">
											<strong class="company">{company}</strong> <span class="team">{team}</span>
										</dd>
									</dl>
								</div>
								<button type="button"
									class="js-participant-chat participant-chat-button">
									<i class="icons-chat"><span class="blind">채팅</span></i>
								</button>
							</li>
						</div>
						<div id="inviteItem" class="d-none">
							<div class="invite-text-area">
								<span>{first-contents}</span> <span>{date}</span> <span
									class="invite-time">{rgsn-dttmdate}</span>
							</div>
						</div>
					</div>
					<!-- projectList에서 Hastag가로 List-->
					<div id="hastTagTransverseItem" class="d-none">
						<li id="{tag-name}" class="hashtag-item"><a href="#"
							class="hashtag">#{tag-name}</a></li>
					</div>
					<div id="taskReportItem" class="d-none">
						<div class="detail-section reports-section">
							<div class="section-title-area">
								<h4 class="section-title">
									<span>업무리포트</span> <span class="section-number">{TOTAL_CNT}</span>
								</h4>
								<button id="taskReportToggleButton" type="button"
									class="js-report-btn reports-button">
									<i class="ico-arrow"></i>
								</button>
							</div>
							<!-- 원형차트 -->
							<div class="js-task-report-layer d-none">
								<div class="taks-report">
									<!--display:none-->
									<!-- chart -->
									<div class="donut-chart-area">
										<div class="donut-chart" id="TASK_DONUT_CHART"></div>
										<div class="task-count" id="TaskCnt">{TOTAL_CNT}</div>
									</div>
									<ul id="taskReportLayer" class="donut-chart-list">
										<li><span class="task-chart-info request" data-code="0">
												<i class="chart-info-label"></i> <span
												class="chart-info-text">{REQ_NAME}<em>{REQ}</em></span> <span
												class="chart-info-percent">{REQ_PER}%</span>
										</span> <span class="task-chart-info progress" data-code="1">
												<i class="chart-info-label"></i> <span
												class="chart-info-text">{PROG_NAME}<em>{PROG}</em></span> <span
												class="chart-info-percent">{PROG_PER}%</span>
										</span> <span class="task-chart-info feedback" data-code="4">
												<i class="chart-info-label"></i> <span
												class="chart-info-text">{FEDBK_NAME}<em>{FEDBK}</em></span>
												<span class="chart-info-percent">{FEDBK_PER}%</span>
										</span></li>
										<li><span class="task-chart-info complete" data-code="2">
												<i class="chart-info-label"></i> <span
												class="chart-info-text">{COMP_NAME}<em>{COMP}</em></span> <span
												class="chart-info-percent">{COMP_PER}%</span>
										</span> <span class="task-chart-info hold" data-code="3"> <i
												class="chart-info-label"></i> <span class="chart-info-text">{HOLD_NAME}<em>{HOLD}</em></span>
												<span class="chart-info-percent">{HOLD_PER}%</span>
										</span></li>
									</ul>
								</div>
							</div>
							<!-- //원형차트 -->
						</div>
					</div>

				</div>
			</div>









			<article id="organizationLayer" class="side-wr" style="display: none">
				<div class="menu-top">
					<strong> 조직도</strong>
					<button id="organizationChartCloseBtn" class="btn-close">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="side-contents">
					<!-- 조직도 리스트 -->
					<strong id="companyName" class="org-tit"></strong>
					<div id="orgSearch" class="all-setup-type-2">
						<i class="icons-search"></i> <input id="organizationInput"
							type="text" class="all-setup-input-type-1"
							placeholder="이름 소속 연락처 내선 검색" autocomplete="off">
					</div>
					<div
						class="group-tree-wrap-1 coperate-section-position-fix-1 js-group-tree-wrap">
						<ul id="organizationChart">
						</ul>
						<div id="nullDvsnData" style="display: none;">
							<div class="group-sub-null-type-1"></div>
							<span>조직도가 존재하지 않습니다.</span>
						</div>
					</div>
				</div>

				<div id="emplArea" class="sub-drag-section-2" style="display: none">
					<div class="line-fixed-section-1">
						<div id="drag" class="sub-drag-icon-type-1 drag"></div>
					</div>
					<div class="sub-drag-header-type-2">
						<span class="dvsn-name" id="emplList-dvsnName"></span> <span
							id="resultSearch" class="empl-search-text d-none">검색 결과</span> <a
							id="emplAreaCloseBtn" href="#" class="group-close-type-1"></a>
					</div>

					<div class="sub-drag-picture-section-1">
						<div id="existEmplData" style="display: none">
							<ul id="organizationChart-emplList">
							</ul>
						</div>

						<div id="nullEmplData" class="null-empl-search"
							style="display: none;">
							<div class="null-wr">
								<div class="group-sub-null-type-1"></div>
								<span>검색 결과가 없습니다.</span>
							</div>
						</div>
					</div>
				</div>


				<div id="organizationItem" style="display: none">
					<li class="department-item" dvsn-cd="{dvsn-cd}" depth="{depth}"
						hgrn-dvsn-cd="{hgrn-dvsn-cd}" {margin-style}="">{group-icon}
						<em class="{button-class}"></em> <span style="cursor: pointer"
						class="group-tree-position-fix-type-{last-code} department-name group-tree-position-fix-type-1 {active}">{dvsn-nm}</span>
						<a href="#" class="js-dvsn-select coperate-check-type-1 d-none"
						{right-style}=""></a> <em class="{root-dvsn-line}"></em>
					</li>
				</div>

				<div id="chartDepthLineItem" style="display: none">
					<em class="chart-depth-line" {depth-line-left}=""></em>
				</div>

				<div id="emplListItem" style="display: none">
					<li class="js-participant-item" data-id="{USER_ID}"
						rcvr_cd="{USER_ID}" rcvr_gb="U" id="{id}"
						profile-image="{PRFL_PHTG}">
						<div class="mini-mode-text-sub-area-1">
							<div class="mini-mode-main-picture-1" {image}=""></div>
							<div class="mini-mode-area-list-type-1">
								<p>
									<strong id="name">{FLNM}</strong>{JBCL_NM}
								</p>
								<p class="mini-mode-text-gray-1">
									<span>{CMNM}</span> {DVSN_NM}
								</p>
							</div>
						</div> <a href="#" id="miniOrganizationChatButton"
						class="mini-mode-circle-type-1 js-participant-chat"> <i
							class="icons-chat"></i>
					</a>
						<div id="selectMemberBtn"
							class="my-check-2 select-member-btn d-none"></div>
					</li>
				</div>
			</article>










			<article id="alarmLayer" class="side-wr d-none">
				<div class="menu-top">
					<strong>알림</strong>
					<button class="js-close-event btn-close">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="side-contents">
					<ul id="notReadFilter" class="tab-menu">
						<li class=" js-alarm js-unread">미확인</li>
						<li class=" js-alarm js-read on">전체</li>
						<li id="readAllAlarm">모두읽음</li>
					</ul>
					<!-- 알림 리스트 -->
					<div class="all-setup-type-2">
						<i class="icons-search"></i> <input id="alarmSearchInput"
							type="text" class="all-setup-input-type-1" placeholder="검색"
							autocomplete="off"> <a href="#"
							id="alarmSearchFilterTopButton" class="all-setup-detail-text-1">옵션</a>
						<div id="alarmSearchFilterLayer"
							class="popup-filter-type-1 d-none">
							<div
								class="js-project-title js-filter-item setup-detail-type-1 setup-active-type-1"
								data-num="0">
								<a href="#"><span>프로젝트명</span><em></em></a>
							</div>
							<div
								class="js-contents js-filter-item setup-detail-type-1 setup-active-type-1"
								data-num="1">
								<a href="#"><span>내용</span><em></em></a>
							</div>
							<div
								class="js-register-id js-filter-item setup-detail-type-1 setup-active-type-1"
								data-num="2">
								<a href="#"><span>작성자</span><em></em></a>
							</div>
						</div>
					</div>
					<div class="name-setup-type-2 scroll-mask">
						<ul id="alarmUl">
						</ul>
					</div>
				</div>
				<div id="alarmItem" class="d-none">
					<li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}"
						colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}"
						alarm_action="{ALARM_ACTION}" alarm_status="{ALARM_STATUS}"
						toast_msg="{msg}" toast_cntn="{contents}">
						<div class="all-setup-picture-type-1" {profile}=""></div>
						<div class="all-text-wrap-type-1">
							<div class="all-setup-section-type-1">
								<span>{TTL}</span><em>{date}</em>
							</div>
							<div class="all-text-wrap-type-2 alarm-tit-ellipsis">
								<i class="{emojiIcon}"></i>{msg}
							</div>
							<div class="all-text-wrap-type-3">{task-name}{contents}</div>
							<div class="all-text-wrap-type-3">
								<span {img-display}=""> <em class="all-setup-icon-type-2"></em>이미지
								</span> <span {file-display}=""> <em
									class="all-setup-icon-type-1"></em>파일
								</span>
							</div>
						</div>
					</li>
				</div>

				<div id="projectAlarmItem" class="d-none">
					<li id="unread-{COLABO_COMMT_SRNO}" class="not-read-alarm-item"
						colabo_srno="{COLABO_SRNO}"
						colabo_commt_srno="{COLABO_COMMT_SRNO}"
						colabo_remark_srno="{COLABO_REMARK_SRNO}"
						alarm_action="{ALARM_ACTION}" alarm_status="{ALARM_STATUS}"
						toast_msg="{msg}">
						<div class="unidentified-item profile">
							<span class="thumbnail size40 radius16" {profile}=""></span>
						</div>
						<div class="middle-wr">
							<div class="unidentified-item title">
								<em class="unidentified-name"><i class="{emojiIcon}"></i>{msg}</em>
								<span class="unidentified-time">{date}</span>
							</div>
							<div class="unidentified-item task">
								<div class="unidentified-task-title {task-yn}">
									{task-name}</div>
								<div class="unidentified-task-content">
									<span>{contents}</span>
									<ul class="unidentified-file-group">
										<li {img-display}=""><span class="unidentified-image">이미지</span>
										</li>
										<li {file-display}=""><span class="unidentified-file">파일</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="unidentified-item button">
							<button type="button" class="unidentified-detail-btn">보기</button>
						</div>
					</li>
				</div>

			</article>









			<article id="chattingLayer" class="side-wr d-none">
				<div class="menu-top">
					<strong>채팅</strong>
					<button type="button"
						class="js-allChat-alarm alarm on js-mouseover js-button-tooltip"
						mouseover-text="">
						<i class="icon-alarm"></i>
					</button>
					<button id="chatCloseBtn" class="btn-close">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="side-contents">
					<ul id="chatTabMenu" class="tab-menu">
						<li id="chatBtn"><span class="popup-tab chat on" tabindex="0">채팅</span></li>
						<li id="contactBtn"><span class="popup-tab chat" tabindex="0">연락처</span>
						</li>
					</ul>
					<div class="popup-right">
						<button type="button" class="js-new-chat popup-button chat">
							<i class="icon-chat"></i> 새 채팅
						</button>
					</div>

					<div class="all-setup-type-2">
						<i class="icons-search"></i> <input id="chattingSearchInput"
							type="text" class="all-setup-input-type-1"
							placeholder="채팅방 또는 이름 검색" autocomplete="off">
					</div>
					<ul id="chatMemberList"
						class="participants-list contact-area d-none"></ul>
					<ul id="chattingUl"
						class="participants-list chat-list-area chat-list scroll-mask"></ul>
				</div>
				<div id="chattingItem" class="d-none">
					<li id="chatting-{ROOM_SRNO}" class="js-chatting-item"
						data-room-srno="{ROOM_SRNO}" data-bg-color-cd="{BG_COLOR_CD}"
						pin-yn="{PIN_YN}">
						<div class="mini-mode-text-sub-area-1">
							<div
								class="mini-mode-main-picture-1 mini-mode-chattng-type profile {profile-display-type}">{profile}
							</div>
							<div class="mini-mode-area-list-type-1">
								<p>
									<strong class="js-title">{ROOM_NM}</strong> <span
										class="mini-mode-chattng-type-2" {sendience-cnt-display}="">({SENDIENCE_CNT})</span>
									<i class="no-alarm mini-mode-chattng-icon-type-1"
										{no-alarm-display}=""></i> <i
										class="pin mini-mode-chattng-icon-type-2" {pin-display}=""></i>
								</p>
								<p class="mini-mode-text-gray-1">
									<i {img-display}="" class="js-image-icon all-setup-icon-type-2"></i><i
										{file-display}="" class="js-file-icon all-setup-icon-type-1"></i><span><a
										class="js-cntn">{CNTN}</a></span>
								</p>
							</div>
							<div class="mini-mode-chattng-type-3">
								<div class="mini-mode-chattng-type-text-1 not-read-count"
									{not-read-display}="">{NOT_READ_CNT}</div>
								<div class="mini-mode-chattng-type-text-2 js-date">{date}</div>
							</div>
						</div>
					</li>
				</div>
			</article>












			<div id="projectMakeLayer"
				class="flow-all-background-1 d-none back-area">
				<div class="flow-project-make-1 back-area">
					<div class="flow-project-make-2 back-area">
						<div class="input-main-layer flow-project-popup-1 d-block">
							<div class="flow-project-header-1">
								<span id="projectMakePopupTitle"></span>
								<button class="js-service-helper js-mouseover"
									service-code="CREATE">
									<i class="icons-help"></i>
								</button>
								<a href="#"
									class="js-project-make-close-btn flow-close-type-1 close-event"></a>
							</div>
							<div class="flow-content scroll-mask">
								<div class="flow-content-1">
									<input id="projectTitleInput" type="text"
										placeholder="제목을 입력하세요." maxlength="50" autocomplete="off"
										data-empty-msg="제목을 입력하세요." data-over-msg="제목은 50자 이하로 입력하세요."
										data-required-yn="Y">
								</div>
								<div class="flow-content-2">
									<textarea id="projectContentsInput"
										placeholder="프로젝트에 관한 설명 입력 (옵션)" data-required-yn="N"></textarea>
								</div>
								<div class="flow-content-3">
									옵션
									<button class="js-service-helper js-mouseover"
										service-code="OPTION">
										<i class="icons-help"></i>
									</button>
								</div>
								<a href="#"> </a>
								<div class="open-yn check-setting flow-content-4"
									style="display: none;">
									<a> <em></em> 회사 공개 프로젝트 설정
									</a>
									<button class="js-sendience-service-helper js-mouseover"
										mouseover-text="회사 직원이라면 누구나 직접 참여를 요청할 수 있도록 설정합니다.">
										<i class="icons-question"></i>
									</button>
									<a href="#">
										<button type="button"
											class="toggle-button check-area js-project-open-toggle">
											<!-- active 클래스로 제어  -->
											<i class="handle"></i>
										</button>
									</a>
								</div>

								<a href="#">
									<div class="open-category-setting flow-content-8 d-none">
										<em></em> 회사 공개 프로젝트 카테고리 설정
										<div class="flow-sub-content-1">
											<span id="categoryName" class="category-name">선택</span><em></em>
											<i></i>
										</div>
									</div>
								</a> <a href="#"> </a>
								<div class="manager-permit-yn check-setting flow-content-5">
									<a> <em></em> 관리자 승인 후 참여 가능
									</a>
									<button class="js-sendience-service-helper js-mouseover"
										mouseover-text="프로젝트 관리자의 승인 이후에 참여할 수 있도록 설정합니다.">
										<i class="icons-question"></i>
									</button>
									<a href="#">
										<button type="button"
											class="toggle-button check-area js-project-toggle">
											<!-- active 클래스로 제어  -->
											<i class="handle"></i>
										</button>
									</a>
								</div>

								<a href="#">
									<div class="more-option-button flow-content-6">
										<em class="main-return-event"></em> 추가 설정
										<div class="flow-sub-content-1">
											<span class="category-name"></span><em></em> <i></i>
										</div>
									</div>
								</a>
							</div>
							<a href="#">
								<div class="project-submit flow-content-7 un-value">만들기</div>
							</a>
						</div>
						<div class="open-category-layer flow-project-popup-2 d-none">
							<div class="flow-project-header-1">
								<a href="#"><em class="main-return-event"></em></a> 회사 공개 프로젝트
								카테고리 설정 <a href="#" class="flow-close-type-1 close-event"></a>

							</div>
							<div class="flow-content scroll-mask">
								<div class="flow-category-option-1">
									<ul class="open-category-ul"></ul>
								</div>
							</div>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="main-return-event flow-pop-sub-button-1">이전으로</div>
								</a> <a href="#">
									<div class="open-category-submit flow-pop-sub-button-2">적용
									</div>
								</a>
							</div>
						</div>
						<div class="more-option-layer flow-project-popup-1 d-none">
							<div class="flow-project-header-1">
								<a href="#"><em class="main-return-event"></em></a> 추가 설정
								<button class="btn-close close-event">
									<i class="icons-close-1"></i>
								</button>
							</div>
							<div class="flow-content scroll-mask">
								<div class="more-option-group">
									<dl class="flow-more-option-1 write-option">
										<dt>글 작성 권한</dt>
										<dd class="check-area" data-manager-write-yn="N">
											<a href="#"><em></em>전체</a>
										</dd>
										<dd class="check-area" data-manager-write-yn="Y">
											<a href="#"><em></em> 프로젝트 관리자만</a>
										</dd>
									</dl>
									<dl class="flow-more-option-1 remark-write-option">
										<dt>댓글 작성 권한</dt>
										<dd class="check-area" data-manager-remark-write-yn="N">
											<a href="#"><em></em>전체</a>
										</dd>
										<dd class="check-area" data-manager-remark-write-yn="Y">
											<a href="#"><em></em> 프로젝트 관리자만</a>
										</dd>
									</dl>
									<dl class="flow-more-option-1 lookup-option">
										<dt class="clearfix">
											글/댓글 조회 권한
											<button class="js-sendience-service-helper js-mouseover"
												mouseover-text="게시물 조회 권한을 설정합니다.">
												<i class="icons-question"></i>
											</button>
											<span class="flow-more-option-alert-txt"> 프로젝트 생성 후에는
												권한 변경이 불가능 합니다 </span>
										</dt>
										<dd class="check-area" data-manager-lookup-yn="N">
											<a href="#"><em></em>전체</a>
										</dd>
										<dd class="check-area" data-manager-lookup-yn="Y">
											<a href="#"><em></em> 프로젝트 관리자 + 글 작성 본인만</a>
										</dd>
									</dl>
									<dl class="flow-more-option-3 download-option">
										<dt>
											파일 조회/다운로드 권한
											<button class="js-sendience-service-helper js-mouseover"
												mouseover-text="첨부 파일, 이미지의 다운로드 및 열람 모두 제한됩니다.">
												<i class="icons-question"></i>
											</button>
										</dt>
										<dd class="check-area" data-manager-download-yn="N">
											<a href="#"><em></em>전체</a>
										</dd>
										<dd class="check-area" data-manager-download-yn="Y">
											<a href="#"><em></em> 프로젝트 관리자 + 글 작성 본인만</a>
										</dd>
									</dl>
								</div>
							</div>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="main-return-event flow-pop-sub-button-1">이전으로</div>
								</a> <a href="#">
									<div class="more-option-submit flow-pop-sub-button-2">확인</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>









			<div id="inviteLayer" class="flow-all-background-1 d-none">
				<div class="window_top rigVer" style="">
					<!-- 우측정렬 class="rigVer" 추가 -->
					<div class="dragArea"
						style="display: list-item; -webkit-app-region: drag;"></div>
				</div>
				<div class="flow-project-make-1">
					<div class="flow-project-make-2">
						<div id="inviteMainLayer" class="detail-popup-type-1"
							style="display: none">
							<div id="copyLinkAlam" class="detail-alarm-type-1 d-none">초대링크를
								클립보드에 복사했습니다.</div>
							<div class="detail-popup-header-1">
								<span id="inviteTitle" class="invite-title ellipsis"><i
									class="project-color color-code-9"></i></span> <a
									class="closeInviteLayerBtn" href="#"><em></em></a>
							</div>
							<ul id="inviteUl">
								<li id="openTeamInvite"><a href="#">
										<div class="detail-popup-icon-1">
											<span></span>
										</div>
										<div class="detail-popuplist-type-1">
											<span>회사 직원 초대</span> <em>회사 직원 또는 조직도를 확인하고 초대할 수 있습니다.</em>
										</div>
								</a></li>
								<li id="openSendienceInvite"><a href="#">
										<div class="detail-popup-icon-2">
											<span></span>
										</div>
										<div class="detail-popuplist-type-1">
											<span>프로젝트 참여자</span> <em>프로젝트를 함께 했던 사람을 초대할 수 있습니다.</em>
										</div>
								</a></li>
								<li id="openSendEml"><a href="#">
										<div class="detail-popup-icon-3">
											<span></span>
										</div>
										<div class="detail-popuplist-type-1">
											<span>이메일 초대장 발송</span> <em>초대장을 이메일로 발송할 수 있습니다.</em>
										</div>
								</a></li>
								<li id="copyInviteLink"><a href="#">
										<div class="detail-popup-icon-4">
											<span></span>
										</div>
										<div class="detail-popuplist-type-1">
											<span>초대 링크 복사</span> <em id="inviteLink"></em>
										</div>
								</a></li>
							</ul>
						</div>
						<div id="sendInviteEmlLayer"
							class="send-invite-email name-type-seach-popup-type-1"
							style="display: none">
							<div class="name-type-seach-popup-header-type-1 margin-bottom-20">
								<a href="#"><em class="returnMainBtn"></em></a> <span>이메일
									초대장 발송</span>
								<button class="btn-close closeInviteLayerBtn">
									<i class="icons-close-1"></i>
								</button>
							</div>
							<div class="invite-email-area scroll-mask">
								<div class="invite-email-list " id="emailList"></div>
								<a id="addEmail" href="#" class="email-plus-type-1"><em></em><span>이메일
										추가</span></a>
								<div class="flow-email-plus-type-1">초대내용 입력</div>
								<div class="flow-email-bottom-section-1">
									<div id="inviteMsg" contenteditable="true"
										class="flow-email-bottom-text-1">
										<p>
											플로우로 업무관리, 채팅, 파일공유를 한 곳에서! <br>아이폰, 안드로이드는 물론 PC에서도
											사용해보세요.
										</p>
									</div>
								</div>
							</div>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="flow-pop-sub-button-1 returnMainBtn">취소</div>
								</a> <a href="#">
									<div id="sendInviteEmail" class="flow-pop-sub-button-2">초대</div>
								</a>
							</div>
						</div>
						<div id="teamInviteLayer" class="name-type-seach-popup-type-1"
							style="display: none">
							<div class="name-type-seach-popup-header-type-1">
								<a href="#"><em class="returnMainBtn"></em></a> <span
									id="teamInviteHeader">회사 직원 초대</span>
								<button class="btn-close closeInviteLayerBtn">
									<i class="icons-close-1"></i>
								</button>
							</div>
							<div class="all-setup-type-2">
								<i class="icons-search"></i> <input type="text"
									id="teamInviteSearch" class="coperate-input-type-1"
									placeholder="이름 소속 연락처 내선 검색" autocomplete="off">
							</div>
							<div id="teamInviteMenu" class="team-wrap-invite-type-1">
								<a id="memberMenu" href="#">
									<div class="team-job-invite-type-1">구성원</div>
								</a> <a id="orgChartMenu" href="#">
									<div class="team-job-invite-type-1">조직도</div>
								</a>
							</div>
							<div class="coperate-icon-list-type-1" style="display: block;">
								<ul id="selectMemberList">
								</ul>
							</div>
							<div id="teamInviteArea"
								class="group-tree-wrap-1 coperate-section-position-fix-1 scroll-mask">
								<ul id="inviteOrgChart" class="d-none">
								</ul>
								<ul id="inviteMemberList"
									class="participants-list invite-member-list">
								</ul>
							</div>
							<div id="inviteEmplArea"
								class="sub-drag-section-2 invite-empl-area coperate-section-position-fix-1"
								style="display: none;">
								<div class="line-fixed-section-1"></div>
								<div class="sub-drag-header-type-2">
									<span id="emplList-dvsnName"></span> <span id="resultSearch"
										class="empl-search-text d-none">검색 결과</span> <a
										id="emplAreaCloseBtn" href="#" class="group-close-type-1"></a>
								</div>
								<div class="sub-drag-picture-section-1">
									<div id="existEmplData" style="display: none">
										<ul id="organizationChart-emplList">
										</ul>
									</div>
									<div id="nullEmplData" class="null-empl-search"
										style="display: none">
										<div class="group-sub-null-type-1"></div>
										<span>검색 결과가 없습니다.</span>
									</div>
								</div>
							</div>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="flow-pop-sub-button-1 returnMainBtn">취소</div>
								</a> <a href="#">
									<div id="submitInvite" class="flow-pop-sub-button-2">확인</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="tempEmailItem" style="display: none">
				<div class="input-email-type-wrap-1 emailItem">
					<input type="text" class="input-email-type-1 emailItemInput"
						placeholder="example@flow.team" data-valid="email" maxlength="50"
						data-required-yn="Y" data-empty-msg="이메일을 작성해주세요!"
						data-over-msg="이메일은 50자이내로 작성해주세요!"
						data-un-valid-msg="올바른 이메일을 작성해주세요!"> <a
						class="deleteEmail" href="#"></a>
				</div>
			</div>
			<div id="selectMemberItem" style="display: none">
				<li rcvr_cd="{rcvr-cd}" rcvr_gb="{rcvr-gb}" id="{id}"><i
					{profile}=""></i> <a href="#"> <span
						class="member-name ellipsis">{name}</span>
				</a> <a href="#"> <em class="deleteMemberItem"></em>
				</a></li>
			</div>
			<div id="selectDvsnItem" style="display: none">
				<li rcvr_cd="{rcvr-cd}" rcvr_gb="{rcvr-gb}" id="{id}"><a
					href="#"> <span class="member-name ellipsis">{dvsn_name}</span>
				</a> <a href="#"> <em class="deleteMemberItem"></em>
				</a></li>
			</div>











			<div id="mySettingPopup" class="flow-all-background-1 d-none zx-9">
				<div class="flow-project-make-1">
					<div class="flow-project-make-2">
						<div id="innerMySettingPopup" class="my-layer-type-3">
							<div class="my-layer-header">
								<div class="my-layer-header-1">
									<div id="myPicture" class="my-prop-picture"
										style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);">
										<a id="editorProfilePhotoBtn" href="#" class="my-button-1"></a>
									</div>
									<span id="accountSetting" class="js-my-setting-title">환경설정</span>
								</div>
								<div class="my-left-style">
									<ul class="my-popup-left-header" id="mySettingLeftMenu">
										<li class="js-my-setting-left"><a id="accountSettingBtn"
											href="#"><em class="my-color-type-2"></em><em
												class="my-type-text-1">계정 설정 </em></a></li>
										<li class="js-my-setting-left"><a id="preferencesBtn"
											href="#"><em class="my-color-type-1"></em><em
												class="my-type-text-2">알림 설정</em></a></li>
										<li class="js-my-setting-left"><a id="projectSettingBtn"
											href="#"><em class="my-color-type-1"></em><em
												class="my-type-text-2">디스플레이 설정</em></a></li>
										<li class="js-my-setting-left"><a
											id="deviceManagementBtn" href="#"><em
												class="my-color-type-1"></em><em class="my-type-text-2">보안
													설정 </em></a></li>
										<li class="js-my-setting-left"><a id="outServiceBtn"
											href="#"><em class="my-color-type-1"></em><em
												class="my-type-text-2">외부서비스 연동</em></a></li>
										<li class="js-my-setting-left" style="display: none"><a
											id="downloadAppBtn" href="#"><em class="my-color-type-1"></em><em
												class="my-type-text-2">다운로드</em></a></li>
										<li id="paymentLeftMenu" class="js-my-setting-left"
											style="display: none"><a id="paymentInfoBtn" href="#"><em
												class="my-color-type-1"></em><em class="my-type-text-2">결제
													정보</em></a></li>
									</ul>
								</div>
								<div id="editorProfilePhoto" class="my-popup-pro-1-1 d-none">
									<a id="changeProfilePhotoBtn" href="#"> <span> <i
											class="icons-picture"></i> 사진 변경
									</span>
									</a> <a id="removeProfilePhotoBtn" href="#"> <span> <i
											class="icons-delete-2"></i> 삭제
									</span>
									</a>
								</div>
								<a href="#" id="mySettingPopupCloseBtn"
									class="my-button-close-1"></a>
							</div>










							<div id="accountSettingLayer"
								class="js-my-scroll-layer my-over-style d-none">
								<div class="my-right-style adjust">

									<a id="companyParticipationBtn"
										class="btn-company-participation" href="#"
										style="display: block;">기존회사에 참여하기</a>

									<ul>
										<li id="upgradeBanner" class="upgrade-area adjust"
											style="display: block;"><strong><span
												id="bannerUserNm"></span>님에게 꼭 필요한 기능들이 준비되어 있습니다!</strong>
											<ul class="upgrade-list">
												<li>500GB 저장 공간 제공</li>
												<li>프로젝트 무제한 생성</li>
												<li>제한 없는 게시물 검색기간</li>
												<li>파일첨부 1회 500MB</li>
											</ul>
											<button id="versionUpgrade" class="btn-upgrade">업그레이드</button>
										</li>
										<li class="adjust">
											<div class="my-right-list-1">이용중인 버전</div>
											<div id="version" class="my-right-list-2">게스트 버전</div>
										</li>
										<li class="adjust">
											<div class="my-right-list-1">아이디</div>
											<div id="user_id" class="my-right-list-2"></div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">이름</div>
											<div class="read-mode d-block">
												<div class="js-user-name my-right-list-2">cyr</div>
											</div> <a href="#" class="poly-icon-1 change-editor-btn"></a>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_user_name" type="text" maxlength="20"
														autocomplete="off" data-required-yn="Y" data-valid="name"
														data-empty-msg="이름을 입력해주세요!" data-over-msg=""
														data-un-valid-msg="특수문자를 사용할 수 없습니다">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div
																class="js-account-set-button js-account-set-button my-button-ok change-ok"
																gubun="1">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input js-company-set adjust">
											<div>
												<div class="my-right-list-1">회사명</div>
												<div class="read-mode d-block">
													<div id="companyName" class="my-right-list-2"></div>
												</div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
												<div class="editor-mode d-none">
													<div class="my-right-list-2 my-type-text-1">
														<input id="editor_companyNm" type="text"
															autocomplete="off" maxlength="50" data-valid="name"
															data-un-valid-msg="특수문자를 사용할 수 없습니다">
														<div class="btn-fr-wrap">
															<a href="#">
																<div class="my-button-cc cancel-change">취소</div>
															</a><a href="#">
																<div
																	class="js-account-set-button my-button-ok change-ok"
																	gubun="7">확인</div>
															</a>
														</div>
													</div>
												</div>
											</div>

										</li>
										<li class="edit-input js-dvsn-set adjust">
											<div class="my-right-list-1">부서명</div>
											<div class="read-mode d-block">
												<div id="dvsnName" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_dvsnNm" type="text" autocomplete="off"
														maxlength="50" data-valid="name"
														data-un-valid-msg="특수문자를 사용할 수 없습니다">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="8">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">직책</div>
											<div class="read-mode d-block">
												<div id="position" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_position" type="text" autocomplete="off"
														maxlength="50" data-over-msg="">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="4">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">휴대폰 번호</div>
											<div class="read-mode d-block">
												<div id="phoneNum" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<select class="my-select-1" id="editor_contury_code">
														<option>+82</option>
														<option>+855</option>
														<option>+1</option>
														<option>+81</option>
														<option>+86</option>
														<option>+852</option>
													</select> <input id="editor_phoneNum" type="text"
														class="my-text-input-1" autocomplete="off"
														data-valid="number" maxlength="20" data-over-msg=""
														data-un-valid-msg="전화번호는 숫자만 입력해주세요!"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a> <a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="3">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">회사 연락처</div>
											<div class="read-mode d-block">
												<div id="companyPhoneNum" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<select id="editor_company_contury_code"
														class="my-select-1">
														<option>+82</option>
														<option>+855</option>
														<option>+1</option>
														<option>+81</option>
														<option>+86</option>
														<option>+852</option>
													</select> <input id="editor_companyPhoneNum" class="my-text-input-1"
														type="text" autocomplete="off" maxlength="20"
														data-over-msg="" data-valid="number"
														data-un-valid-msg="전화번호는 숫자만 입력해주세요!"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a> <a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="5">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input js-email-set adjust">
											<div class="my-right-list-1">이메일</div>
											<div class="read-mode d-block">
												<div id="email" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_user_email" type="text"
														autocomplete="off" data-valid="email" maxlength="50"
														data-empty-msg="이메일을 작성해주세요!" data-over-msg=""
														data-un-valid-msg="올바른 이메일을 작성해주세요!">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="2">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust" id="passwordArea"
											style="display: block;">
											<div class="read-mode d-block">
												<div class="my-right-list-1">비밀번호</div>
												<div class="my-right-list-password">
													<strong class="password-alert">비밀번호 재설정이 가능합니다.</strong> <input
														type="password" id="normalPasswordInput"
														class="my-input-password-1 d-none" disabled=""
														placeholder="영문과 숫자를 포함한 6자리 이상" style="display: block;">
													<input type="password" id="bizplayPasswordInput"
														class="my-input-password-1 d-none" disabled=""
														placeholder="Bizplay 계정은 아래 버튼을 통해 비밀번호를 변경 하실 수 있습니다."
														style="display: none;">
													<button class="js-myset-password change-editor-btn">비밀번호
														재설정</button>
												</div>
											</div>
											<div class="editor-mode d-none">
												<ul>
													<li>
														<div class="my-right-list-1">비밀번호</div>
														<div class="my-right-list-2 edit-password">
															<a href="#"></a><span class="my-txt-t-1">비밀번호는 영문,
																숫자 포함 6자리 이상이어야 합니다.</span>
															<div class="btn-fr-wrap">
																<a href="#">
																	<div id="changePasswordCancel" class="my-button-cc">취소</div>
																</a><a href="#">
																	<div id="changePasswordBtn" class="my-button-ok">확인</div>
																</a>
															</div>
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">비밀번호</span> <input type="password"
																id="myPassword" class="my-input-password-2"
																autocomplete="off" data-required-yn="Y" maxlength="20"
																data-valid="password" data-empty-msg="비밀번호를 입력해주세요"
																data-over-msg=""
																data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
																placeholder="비밀번호를 입력해주세요">
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">비밀번호 확인</span> <input
																type="password" class="my-input-password-2"
																id="myPassword2" autocomplete="off" data-required-yn="Y"
																maxlength="20" data-valid="password"
																data-empty-msg="비밀번호를 입력해주세요" data-over-msg=""
																data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
																placeholder="비밀번호를 다시 입력해주세요">
														</div>
													</li>
												</ul>
											</div>
										</li>
										<li class="edit-input adjust" id="statusMessageMenu">
											<div>
												<div class="my-right-list-1">상태 메시지</div>
												<div class="read-mode d-block">
													<div id="statusMessage"
														class="my-right-list-2 status-message"></div>

												</div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
												<div class="editor-mode d-none">
													<div class="my-right-list-2 my-type-text-1">
														<input id="editor_statusMessage" type="text"
															autocomplete="off" maxlength="50">
														<div class="btn-fr-wrap">
															<a href="#">
																<div class="my-button-cc cancel-change">취소</div>
															</a><a href="#">
																<div
																	class="js-account-set-button my-button-ok change-ok"
																	gubun="9">확인</div>
															</a>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
									<button id="leaveFlowBtn" class="btn-leave"
										style="display: block;">탈퇴</button>
								</div>
							</div>









							<div id="preferencesLayer"
								class="js-my-scroll-layer my-over-style d-none">
								<div class="my-right-style-4">
									<ul id="pushAlamGroup" class="push-alarm-group">
										<li>
											<div class="my-right-list-1">푸시 설정</div>
											<div class="my-right-list-3">
												새로운 글, 댓글, 채팅의 실시간 알림을 받습니다.
												<button type="button" id="pushAlamSetting"
													class="toggle-button my-check-1">
													<!-- active 클래스로 제어  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												프로젝트 알림<a href="#">
													<div id="projectAlamSetting" class="my-check-2"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												채팅 알림<a href="#">
													<div id="chatAlamSetting" class="my-check-2-1"></div>
												</a>
											</div>
										</li>
									</ul>
									<ul id="doNotDisturbGroup" class="disturb-group">
										<li>
											<div class="my-right-list-1 mgt-20">방해 금지 모드</div>
											<div class="my-right-list-3 mgt-20">
												선택한 요일과 시간에 알림을 받지 않습니다.
												<button type="button" id="doNotDisturbSetting"
													class="toggle-button my-check-1">
													<!-- active 클래스로 제어  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1" id="notDisturbDailyEmpty"></div>
											<div class="my-right-list-2" id="notDisturbDailyList">
												요일
												<ul id="doNotDisturbDayby" class="my-dayby-w-1">
													<li class="my-dayby-1 day-of-the-week"><a href="#">일</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">월</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">화</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">수</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">목</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">금</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">토</a></li>
												</ul>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												시간
												<div class="float-right-1">
													<select id="doNotDisturbStartTime" class="my-type-1">
														<option>00:00</option>
														<option>01:00</option>
														<option>02:00</option>
														<option>03:00</option>
														<option>04:00</option>
														<option>05:00</option>
														<option>06:00</option>
														<option>07:00</option>
														<option>08:00</option>
														<option>09:00</option>
														<option>10:00</option>
														<option>11:00</option>
														<option>12:00</option>
														<option>13:00</option>
														<option>14:00</option>
														<option>15:00</option>
														<option>16:00</option>
														<option>17:00</option>
														<option>18:00</option>
														<option>19:00</option>
														<option>20:00</option>
														<option>21:00</option>
														<option>22:00</option>
														<option>23:00</option>
														<option>24:00</option>
													</select> <span class="my-mk-1">~</span> <select
														id="doNotDisturbEndTime" class="my-type-1">
														<option>00:00</option>
														<option>01:00</option>
														<option>02:00</option>
														<option>03:00</option>
														<option>04:00</option>
														<option>05:00</option>
														<option>06:00</option>
														<option>07:00</option>
														<option>08:00</option>
														<option>09:00</option>
														<option>10:00</option>
														<option>11:00</option>
														<option>12:00</option>
														<option>13:00</option>
														<option>14:00</option>
														<option>15:00</option>
														<option>16:00</option>
														<option>17:00</option>
														<option>18:00</option>
														<option>19:00</option>
														<option>20:00</option>
														<option>21:00</option>
														<option>22:00</option>
														<option>23:00</option>
														<option>24:00</option>
													</select>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>










							<div id="deviceManagementLayer"
								class="js-my-scroll-layer my-over-style-2 d-none">
								<div class="my-right-style-9 js-my-scroll-layer">
									<div class="my-right-style-3">
										<ul class="lock-list">
											<li>
												<div class="my-right-list-1">잠금모드</div>
												<div class="my-right-list-3">
													설정한 시간 동안 사용하지 않으면 로그아웃 됩니다.
													<button type="button" id="lockModeSetting"
														class="toggle-button my-check-1">
														<!-- active 클래스로 제어  -->
														<i class="handle"></i>
													</button>
												</div>
											</li>
											<li>
												<div class="my-right-list-1"></div>
												<div class="my-right-list-2">
													시간 설정 <select id="lockTime" class="my-type-5">
														<option value="1">1분</option>
														<option value="5">5분</option>
														<option value="10">10분</option>
														<option value="30">30분</option>
														<option value="60">1 시간</option>
														<option value="120">2 시간</option>
														<option value="180">3 시간</option>
														<option value="240" selected="">4 시간</option>
														<option value="300">5 시간</option>
													</select>
												</div>
											</li>
										</ul>
										<strong class="device-tit">접속기기 관리</strong>
										<ul id="deviceList" class="my-right-data d-none">
											<li>
												<p class="data-position-fix-1">
													<b> {DUID_NM}</b>
												</p>
												<p class="data-color-type-1">
													<b>마지막 사용</b><span> {LAST_DATE}</span>
												</p>
												<p class="data-color-type-1">
													<b>최초 등록일</b><span> {FIRST_DATE}</span>
												</p> <a id="removeDevice" duid="{DUID}" href="#"
												class="data-delete-button-1 remove-btn {DISPLAY_REMOVE}">
													<div>제거</div>
											</a>
												<div class="wifi-icon-wrap-1 {DISPLAY_CURRENT}">
													<div class="wifi-icon-1"></div>
													<span>현재 접속기기</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>









							<div id="projectSettingsLayer"
								class="js-my-scroll-layer my-over-style d-none">
								<div class="my-right-style-3">
									<ul>
										<li style="display: none">
											<div class="my-right-list-1 mgt-20">좌측모드 테마</div>
											<div class="my-right-list-3 mgt-20">
												<span class="my-right-position-fix-1">좌측 메뉴의 컬러 테마를
													지정하실 수 있습니다.</span>
											</div>
										</li>
										<li style="display: none">
											<div class="my-right-list-1"></div>
											<div class="my-right-list-4">
												<div class="my-right-check-dark">
													<div class="my-right-check-dark-icon"></div>
													<p>다크</p>
													<a href="#">
														<div id="darkThemeSetting"
															class="my-check-2 theme-posion-fix"></div>
													</a>
												</div>
												<div class="my-right-check-light">
													<div class="my-right-check-light-icon"></div>
													<p>라이트</p>
													<a href="#">
														<div id="lightThemeSetting"
															class="my-check-2-1 theme-posion-fix"></div>
													</a>
												</div>
											</div>
										</li>
										<li>
											<div class="my-right-list-1">프로젝트 색상</div>
											<div class="my-right-list-3">
												<span class="my-right-position-fix-1">프로젝트 만들기 또는 초대
													받았을때, 프로젝트의 색상을 지정합니다.</span>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<span class="my-right-position-fix-1">랜덤으로 설정</span> <a
													href="#">
													<div id="randomColorSetting" class="my-check-2"></div>
												</a>
												<ul class="my-control-wrap-1">
													<li class="my-control-1"></li>
													<li class="my-control-2"></li>
													<li class="my-control-3"></li>
													<li class="my-control-4"></li>
													<li class="my-control-5"></li>
													<li class="my-control-6"></li>
													<li class="my-control-7"></li>
													<li class="my-control-8"></li>
													<li class="my-control-9"></li>
													<li class="my-control-10"></li>
													<li class="my-control-11"></li>
													<li class="my-control-12"></li>
												</ul>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<span class="my-right-position-fix-1">흰색으로 고정</span> <a
													href="#">
													<div id="whiteColorSetting" class="my-check-2"></div>
												</a>
												<div class="my-control-wrap-1">
													<div class="my-control-12"></div>
												</div>
											</div>
										</li>
										<li class="my-setting-favorite-project">
											<div class="my-right-list-1 mgt-20">프로젝트 즐겨찾기</div>
											<div class="my-right-list-3 mgt-20">
												<span class="my-right-position-fix-1">프로젝트 즐겨찾기 시,
													상단에 고정하도록 설정할 수 있습니다.</span> <span id="resetBtn" class="btn-reset"><a
													href="#" class="my-right-icon-type-1"></a>초기화</span>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<span class="my-right-position-fix-1"> 즐겨찾기 사용 </span> <a
													href="#">
													<div id="useFavoritesSetting" class="my-check-2"></div>
												</a>
											</div>
										</li>
										<li><div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<span class="my-right-position-fix-1">즐겨찾기 사용안함</span> <a
													href="#"><div id="notUseFavoritesSetting"
														class="my-check-2"></div></a>
											</div></li>
										<li>
											<div class="my-right-list-1 mgt-20">언어</div>
											<div class="my-right-list-3 mgt-20">사용할 나라의 언어를 선택합니다.</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												언어 <select id="langSetting" class="my-type-3">
													<option value="ko">한국어(Korean)</option>
													<option value="en">영어(English)</option>
												</select>
											</div>
										</li>
										<!-- Deprecated (Moment.js로 수정)
            <li>
                <div class="my-right-list-1"></div>
                <div class="my-right-list-2">
                  타임존
                  <select id="timezoneSetting" class="my-type-4">
                    <option data-time="+900">(UTC +09:00) 대한민국(Korea), 일본(Japan)</option>
                    <option data-time="+800">(UTC +08:00) 싱가폴(Singapole), 필리핀(Philippines)</option>
                    <option data-time="+700">(UTC +07:00) 베트남(Vietnam), 캄보디아(Cambodia)</option>
                    <option data-time="+200">(UTC +02:00) 서유럽권(Western Europe), DST</option>
                    <option data-time="+100">(UTC +01:00) 영국(England), DST</option>
                    <option data-time="-500">(UTC -05:00) 미국 뉴욕(New York, USA), DST</option>
                    <option data-time="-600">(UTC -06:00) 미국 시카고(Chicago, USA), DST</option>
                    <option data-time="-700">(UTC -07:00) 미국 덴버(Denver, USA), DST</option>
                    <option data-time="-800">(UTC -08:00) 미국 LA(Los Angeles, USA), DST</option>
                  </select>
                </div>
              </li>
              -->
									</ul>
								</div>
							</div>









							<div id="downloadAppLayer" class="my-over-style d-none">
								<div class="my-right-style-3">
									<div class="my-right-inoutput">
										<div class="my-download-icon-type-4"></div>
										<select id="countryCode" class="my-select-2">
											<option>+82</option>
											<option>+855</option>
											<option>+1</option>
											<option>+81</option>
											<option>+852</option>
										</select> <input id="phoneNumber" type="text"
											class="my-download-text-type-1"> <a id="smsSendBtn"
											href="#" class="my-right-sevice-button-1">
											<div>문자 전송</div>
										</a>
									</div>
									<ul class="my-download-wrap-type-1">
										<li>
											<div class="my-right-list-1 mgt-20">데스크탑 앱</div>
											<div class="my-right-list-2 mgt-20">
												<div class="my-download-icon-type-1"></div>
												<span>Mac OS</span> <a href="#">
													<div id="macDownloadBtn" class="my-check-3"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<div class="my-download-icon-type-2"></div>
												<span>Windows</span> <a href="#">
													<div id="windowDownloadBtn" class="my-check-3"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1 mgt-20">모바일 앱</div>
											<div class="my-right-list-2 mgt-20">
												<div class="my-download-icon-type-1"></div>
												<span>IOS</span> <a href="#">
													<div id="iosDownloadBtn" class="my-check-3"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												<div class="my-download-icon-type-3"></div>
												<span>Android</span> <a href="#">
													<div id="androidDownloadBtn" class="my-check-3"></div>
												</a>
											</div>
										</li>
									</ul>
								</div>
							</div>









							<div id="paymentInfoLayer"
								class="js-my-scroll-layer my-over-style" style="display: none">
								<div class="my-right-style-3">
									<div class="my-right-inoutput">
										등록한 카드로 매월 10일 자동결제 됩니다.
										<button id="changePay" class="btn-credit">결제수단 변경</button>
									</div>
									<table class="table-credit">
										<thead>
											<tr>
												<td>카드구분</td>
												<td>카드번호 끝 4자리</td>
												<td>유효기간</td>
												<td>결제구분</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td id="cardNm"></td>
												<td id="cardNum"></td>
												<td id="CardExpire"></td>
												<td id="payGubun"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>










							<div id="outServiceLayer"
								class="js-my-scroll-layer my-over-style-2 d-none">
								<div class="my-right-style-5">
									<div class="my-right-inoutput my-position-fix">
										<p>
											플로우와 연동하여 사용을 희망하는 서비스가 목록에 없으신가요? <br> 플로우 팀에게 희망 연동
											서비스를 알려주세요!
										</p>

										<a id="serviceApplyBtn" href="#"
											class="my-right-sevice-button-1">
											<div>요청</div>
										</a>
									</div>
									<ul class="my-inoutput-list-type-1">
										<li>
											<div class="my-inoutput-icon-type-1"></div>
											<div class="my-inoutput-text-type-1">
												<p class="my-inoutput-text-type-2">Zoom</p>
												<p class="my-inoutput-text-type-3 d-inline-block">플로우에
													Zoom을 연동합니다</p>
												<a href="#" class="more-txt js-learn-details d-none"
													service-code="ZOOM">자세히 알아보기</a>
											</div> <a id="zoomConnectBtn"
											class="my-inoutput-button-type-1 js-connect-btn">
												<div>연동</div>
										</a>
										</li>
										<li>
											<div class="my-inoutput-icon-type-3"></div>
											<div class="my-inoutput-text-type-1">
												<p class="my-inoutput-text-type-2">Google Calendar</p>
												<p class="my-inoutput-text-type-3">플로우에 Google Calendar을
													연동합니다</p>
											</div> <a class="my-inoutput-button-type-3 js-connect-btn">
												<div>준비중</div>
										</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>








		<!--참여자 관리-->
		<div id="allSendiencePopup" class="flow-all-background-1"
			style="display: none;">
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="allSendienceLayer" class="project-invite-popup-1">
						<div class="name-type-seach-popup-header-type-1">
							<span>참여자 관리</span>
							<button class="js-sendience-service-helper js-mouseover">
								<i class="icons-help"></i>
							</button>
							<button id="closeButton" class="btn-close">
								<i class="icons-close-1"></i>
							</button>
						</div>
						<div class="all-setup-type-2">
							<i class="icons-search"></i> <input type="text"
								id="allSendienceSearch" class="coperate-input-type-1"
								placeholder="참여자명으로 검색">
						</div>
						<div
							class="sub-drag-picture-section-1 overflow-scroll-type-1  scroll-mask">
							<ul id="allSendienceUl" class="all-sendience-ul">
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>









		<div id="imageViewerItem">
			<div class="image-viewer-wrap js-image-viewer-item d-none"
				tabindex="1" style="overflow: hidden;">
				<div class="image-viewer-header">
					<div class="image-title-area">
						<div class="image- title-top" style="color: white;">
							<span class="js-img-title image-title"></span> <span
								class="image-size"></span> <span class="image-resolution"></span>
							<span class="secret-image"></span>
						</div>
						<div class="image-title-bottom" style="color: #999;">
							<span class="image-user-name"></span> <span
								class="image-upload-date"></span>
						</div>
					</div>
					<a href="#" role="button" class="viewer-close-button"> <span
						class="blind">close</span>
					</a>
				</div>
				<div class="js-container image-viewer-container">
					<a href="#" role="button" class="viewer-button left"
						data-img-idx="-1"> <span class="blind">left</span>
					</a>
					<div class="image-group">
						<div class="js-img-back image-bg"></div>
					</div>
					<a href="#" role="button" class="viewer-button right"
						data-img-idx="1"> <span class="blind">right</span>
					</a>
				</div>
				<div class="image-viewer-footer">
					<div class="btn-editbox left-fix" style="display: block;">
						<span class="img-now">1</span>/<span class="js-total-count">2</span>
					</div>
					<div class="btn-editbox">
						<a href="#" role="button" class="image-edit-btn rotate"><span>회전</span></a>
						<a href="#" role="button" class="image-edit-btn plus"> <span>확대</span></a>
						<a href="#" role="button" class="image-edit-btn minus"> <span>축소</span></a>
						<a href="#" role="button" class="image-edit-btn autosize"> <span>초기화</span></a>
					</div>
					<div class="btn-editbox right-fix">
						<a href="#" id="btnDownPic" class="viewer-save"
							data-langcode="CT927">저장</a> <a href="#" role="button"
							class="viewer-save" id="btnAllDownPic"> 전체 저장 </a>
					</div>
				</div>
			</div>
		</div>

	</div>









	<div id="bottomToolList" class="bottom-tool-list">
		<div class="js-tool-item tool-item" id="quickGuideMenu"
			data-code="quick" style="display: block;">
			<button type="button"
				class="js-quick-button js-bottom-quick-button d-none btn-help-open"
				style="display: inline-block;">
				<span class="help-wr"> <img
					src="flow-renewal/assets/images/icons/help_center01.png"
					alt="고객센터 열기">
				</span> 고객센터
			</button>
			<div class="js-bottom-quick-layer quick-guide quick-pop d-none"
				style="display: none;">
				<div class="quick-guide-header">
					<div class="quick-guide-title">플로우 쉽게 사용하기</div>
					<button type="button" class="js-quick-close btn-help-close"
						style="display: none;">
						<img src="flow-renewal/assets/images/icons/help_center02.png"
							alt="고객센터 닫기">
					</button>
				</div>
				<div class="help-center">
					<div class="help-contents">
						<strong class="help-tit">1:1 문의하기</strong>
						<div class="help-middle">
							<em class="helr-active"> <img
								src="flow-renewal/assets/images/icons/help_center04.png" alt="">
								<i class="active-on"></i>
							</em>
							<div class="help-txt">
								<p>
									플로우에 대해 궁금한 점을 남겨주세요!<br>최대한 빠르게 답변 드리겠습니다.
								</p>
								<p class="help-txt-sub">고객센터 운영시간 : 평일 9:00 ~ 18:00</p>
							</div>
						</div>
						<button type="button" class="js-btn-help-talk btn-help-talk">
							<i><img
								src="flow-renewal/assets/images/icons/help_center03.png" alt=""></i>편하게
							소통하기
						</button>

					</div>
				</div>
				<div class="quick-guide-contents">
					<strong class="help-tit">플로우 이용가이드</strong>
					<ul id="quickGuideList" class="quick-guide-list">
						<li><a target="_blank" class="quickGuideLi"
							href="https://blog.naver.com/madrascheck/222484670050"=""=""><em
								class="new">New </em> 플로우 달라진 기능 확인하기 👀</a></li>

						<li><a target="_blank" class="quickGuideLi"
							href="https://flow.team/download.act"=""=""><em class="new">New
							</em>🌐New PC버전 다운로드</a></li>

						<li><a target="_blank" class="quickGuideLi"
							href="https://support.flow.team/hc/ko/articles/360056979552"=""="">🎓플로우
								온라인 교육</a></li>

						<li><a target="_blank" class="quickGuideLi"
							href="https://support.flow.team/hc/ko/categories/4403605340557"=""="">🍯
								FAQ - 플로우 매뉴얼</a></li>

						<li><a target="_blank" class="quickGuideLi"
							href="https://support.flow.team/hc/ko/articles/4404358245645"=""="">🙋‍♂️직원들과
								플로우 함께하기 (직원 추가 방법)</a></li>

						<li><a target="_blank" class="quickGuideLi"
							href="https://forms.gle/W3VTPVxZgm9yUFgt5"=""="">✨새로운 플로우
								설문조사 (+희망 기능 투표)</a></li>
					</ul>
				</div>
			</div>
		</div>
		<!--<div class="js-tool-item tool-item" data-code="write">
        <button type="button" class="write-button">
            <img src="flow-renewal/assets/images/icons/icon_text.png" alt="텍스트">
        </button>
    </div>-->
		<!-- <div class="js-moveTop tool-item">
        <button id="moveTopButton" type="button" class="move-top">
            <img src="flow-renewal/assets/images/icon-scroll-top.png" alt="상단으로 이동 버튼">
        </button>
    </div> -->
	</div>

	<div id="quickGuideItem" class="d-none">
		<li><a target="_blank" class="quickGuideLi" {href}="">{new}{service_name}</a></li>
	</div>










	<div class="d-none">
		<div id="taskSortHeaderItem" class="d-none">
			<div col-srno="{COL_SRNO}" class="{COL_CLASS}">
				<span class="title {COL_SPAN_CLASS}">{COL_NM}</span>
			</div>
		</div>

		<ul id="taskAreaItem" class="d-none">
			<li id="{project-srno}"></li>
		</ul>

		<ul id="taskListProjectItem" class="d-none">
			<li id="{GUBUN}" colabo-srno="{COLABO_SRNO}"
				colabo-commt-srno="{COLABO_COMMT_SRNO}" class="js-gubun-li">
				<div class="js-gubun-button all-task-project">
					<span class="project-title">{GUBUN_NM}</span> <span
						class="project-task-count">{TASK_CNT}</span>
				</div>
				<ul class="js-inner-task project-inner-task active">{TASK_UL}
				</ul>
			</li>
		</ul>

		<ul id="taskListItem" class="d-none">
			<li id="allTask-{COLABO_COMMT_SRNO}" class="task-item {LI_STTS}"
				data-project-srno="{COLABO_SRNO}"
				data-post-srno="{COLABO_COMMT_SRNO}" data-task-srno="{TASK_SRNO}"
				data-post-code="4">{COLUMN_LIST}</li>
		</ul>

		<div id="taskListNomalItem" class="d-none">
			<div class="{NOMAL_CLASS} {CELL_CLASS} task-item-cell">
				<div class="{NOMAL_TEXT_CLASS} ellipsis" {mouseover}="">{NOMAL}</div>
			</div>
		</div>

		<div id="taskListPriorityItem" class="d-none">
			<div class="js-priority task-item-cell {CELL_CLASS}">
				<div class="js-priority-span rank-span">
					<i class="{PRIORITY_ICON} small"></i> <span
						class="js-priority-text priority-text-cell ellipsis">
						{PRIORITY}</span>
				</div>
			</div>
		</div>

		<div id="taskListStatusItem" class="d-none">
			<div class="task-item-cell task-state {CELL_CLASS}">
				<span class="js-task-state {STTS}">{STTS_TITLE}</span>
			</div>
		</div>
		<div id="taskListTitleItem" class="d-none">
			<div class="task-item-cell task-name {CELL_CLASS}">
				<div class="js-post-title task-title ellipsis js-mouseover"
					mouseover-text="{TASK_NM}">
					{TASK_NM} <em class="subtask-item" {subtask-display}=""> <i
						class="icons-subtask"></i> <span class="subtask-number">{SUBTASK_CNT}</span>
					</em>
				</div>
				<div class="js-post-title project-title" {project_display}="">
					<i class="icons-project-1"></i>{PRJ_TTL}
				</div>
			</div>
		</div>

		<div id="taskListWorkerItem" class="d-none">
			<div class="js-workers task-item-cell {CELL_CLASS}">
				<span class="js-mouseover" mouseover-text="{MOUSEOVER_WORKER_LIST}">
					<span class="js-worker-name manager ellipsis">{WORKER}</span> <span
					class="js-worker-count">{WORKER_COUNT}</span>
				</span>
			</div>
		</div>

		<div id="taskListProgressItem" class="d-none">
			<div class="task-item-cell task-progress-bar {CELL_CLASS}">
				<span class="progress-bar"> <span
					class="js-progress-bar {progress-class}" {progress}=""></span>
				</span>
			</div>
		</div>

		<div id="taskSortSettingPopupItem" style="display: none;">
			<div class=" flow-all-background-1 back-area">
				<div class="flow-project-make-1 back-area">
					<div class="flow-project-make-2 back-area">
						<div id="sortLayer" class="project-invite-popup-1 task-view-popup">
							<div class="name-type-seach-popup-header-type-1">
								<span>보기 설정</span>
								<button class="close-button flow-close-type-1"></button>
							</div>
							<p class="task-set-description">
								항목 순서 변경과 조회할 항목을 선택할 수 있습니다. <em>업무명은 필수 항목입니다.</em>
							</p>
							<ul id="taskSortList"
								class="invite-popup-list-type-2 ui-sortable scroll-mask"></ul>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="js-init-button flow-pop-sub-button-1">초기화</div>
								</a> <a href="#">
									<div class="js-save-button flow-pop-sub-button-2">저장</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ul id="taskSortPopupLiItem" style="display: none;">
			<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
				<div class="task-set-item">
					<span class="task-set-move-handle"></span> <span
						class="task-set-title">{COL_NM}</span>
					<button type="button"
						class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
						<i class="handle"></i>
					</button>
				</div>
			</li>
		</ul>
	</div>










	<div id="inviteItem" class="d-none">
		<div class="invite-text-area">
			<span>{CNTN}</span> <span class="invite-time">{date}</span>
		</div>
	</div>
	<div id="postItem" class="d-none">
		<li id="post-{COLABO_COMMT_SRNO}"
			class="js-popup-before detail-item back-area"
			data-read-yn="{READ_YN}" data-project-srno="{COLABO_SRNO}"
			data-post-srno="{COLABO_COMMT_SRNO}"
			data-remark-srno="{COLABO_REMARK_SRNO}" data-rgsr-id="{RGSR_ID}"
			mngr-wryn="{mngr-wryn}" mngr-dsnc="{mngr-dsnc}"
			data-post-code="{post-code}" pin-yn="{PIN_YN}" status="{status-raw}"
			todo-done-percent="{TODO_DONE_PERCENT}" time="{start-date-time-raw}"
			data-code="{data-code}" data-post-url="{post-url}">
			<div class="js-post-nav list-item post-list-wrapper">
				<div class="fixed-list">
					<a href="#"> <i class="js-indication display-new-indication"
						{alarm-display}=""></i>
						<div class="fixed-kind">
							<i class="icons-{post-gb}"></i> <span>{post-name}</span>
						</div>
						<p class="js-post-title fixed-text {complete-yn}">{first-contents}</p>
						<div class="post-list comment" {remark-display}="">
							<i class="icons-comment2"></i> <span class="js-remark-count">{remark-count}</span>
						</div>
						<div class="post-list-right">
							<div class="post-list name">{name}</div>
							<div class="post-list date">{date}</div>
							<div class="fixed-value">
								<span class="js-todo-state state request d-none"
									{todo-display}="">{TODO_DONE_PERCENT}</span> <span
									class="js-task-state state d-none {status-code}"
									{task-display}="">{status}</span>
								<div class="js-schedule-state date-time d-none"
									{schedule-display}="">
									<em class="date">{start-date}</em> <span>{start-time}</span>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div
				class="js-post-nav card-item post-card-wrapper {post-gb} {subtask-gb}">
				<button type="button" class="post-popup-button left"></button>
				<div class="post-popup-header card-popup-header d-none">
					<h3 class="card-popup-title">
						<i id="projectTitleColor"
							class="project-color color-code-{BG_COLOR_CD}"></i> <span
							class="js-project-title-button">{COLABO_TTL}</span> <span
							class="subtask-title up-task-title js-up-task-button"
							{up-task-display}=""
							data-up-task-project-srno="{data-up-task-project-srno}"
							data-up-task-post-srno="{data-up-task-post-srno}"
							data-up-task-srno="{data-up-task-srno}"> {UP_TASK_TTL}</span>
					</h3>
					<button class="btn-close card-popup-close">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="post-card-header">
					<div class="post-card-scroll">
						<div class="card-header-top">
							<div class="post-author js-post-author"
								data-author-id="{author-id}">
								<span class="thumbnail size40 radius16" {profile}=""></span>
								<dl class="post-author-info">
									<dt>
										<strong class="author ellipsis">{name}</strong> <em
											class="position ellipsis" {prfl-dvsn-display}="">{position}</em>
										<span class="date">{date}</span> <span class="post-security">
											<i class="{security-class} js-mouseover"
											mouseover-text="{security-text}"></i>
										</span>
									</dt>
									<dd class="{personal-yn}">

										<span class="team">{team}</span>
									</dd>
								</dl>
							</div>
							<div>
								<div class="post-option">
									<button id="movePost" class="btn-go d-none">게시글 바로가기</button>
									<button id="pinToTopBnt"
										class="fixed-btn {PIN_USE_YN} {PINNED}" {pin-btn-display}="">
										<!-- fixed-btn on class -->
										<span class="blind">상단 고정 등록</span>
									</button>
									<button class="js-setting-button set-btn"
										{menu-button-display}="">
										<span></span> <span></span> <span></span>
									</button>
									<ul class="js-setting-ul js-setting-layer setup-group d-none">
										<li class="js-setting-item" data-code="modify"
											{menu-modify-display}=""><a href="#"> <i
												class="icons-write"></i>수정
										</a></li>
										<li class="js-setting-item" data-code="delete"
											{menu-delete-display}=""><a href="#"> <i
												class="icons-delete-3"></i>삭제
										</a></li>
										<li class="js-setting-item" data-code="copy"><a href="#">
												<i class="icons-project-1"></i>다른 프로젝트에 복사
										</a></li>
										<li class="js-setting-item" data-code="url"
											{menu-url-display}=""><a href="#"> <i
												class="icons-copy"></i>링크 복사
										</a></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="card-header-bottom {no-title}">
							{schedule-header}
							<div class="post-title-area">
								<h4 class="js-post-title post-title {complete-yn}">{COMMT_TTL}</h4>
								<div class="schedule-period-area d-none"
									{schedule-period-display}="">
									<span class="schedule-period">{start-date-time}</span> <span
										class="schedule-period" {end-date-display}="">{end-date-time}</span>
								</div>
							</div>
							<div class="post-state">
								<span class="task-number {task-yn}" data-task="{task-srno}">
									업무번호 <em>{task-number}</em>
								</span>
							</div>
						</div>
						<div class="post-card-container">
							{contents}


							<div class="post-bottom-area">
								<div class="post-bottom-menu">
									<div class="js-emoji-group-layer emoji-area" {emoji-display}="">
										<ul class="emoji-group">{emoji-icons}
										</ul>
										<span class="emoji-count-area"> <span
											class="emoji-count">{emoji-text}</span>
										</span>
									</div>
									<div class="bottom-button-area">
										<button
											class="js-post-reaction post-bottom-button {reaction-display}">
											<i class="icon-reaction"></i> <span>{reaction-text}</span>
										</button>
										<button
											class="js-post-bookmark post-bottom-button {bookmark-display}">
											<i class="icon-bookmark"></i> <span>북마크</span>
										</button>
										<ul class="js-emoji-select-layer emoji-select-group"
											style="display: none;">
											<li class="add-reaction" data="1"><a href="#"
												role="button"> <i class="icon-emoji like"></i>
													<p class="emoji-text">좋아요</p>
											</a></li>
											<li class="add-reaction" data="2"><a href="#"
												role="button"> <i class="icon-emoji please"></i>
													<p class="emoji-text">부탁해요</p>
											</a></li>
											<li class="add-reaction" data="3"><a href="#"
												role="button"> <i class="icon-emoji sad"></i>
													<p class="emoji-text">힘들어요</p>
											</a></li>
											<li class="add-reaction" data="4"><a href="#"
												role="button"> <i class="icon-emoji great"></i>
													<p class="emoji-text">훌륭해요</p>
											</a></li>
											<li class="add-reaction" data="5"><a href="#"
												role="button"> <i class="icon-emoji thank"></i>
													<p class="emoji-text">감사해요</p>
											</a></li>
										</ul>
									</div>
								</div>
								<div class="cmt-read-wr">
									<div class="comment-count-area">
										<span>댓글</span> <span class="comment-count">{remark-count}</span>
									</div>
									<div class="js-read-check-button read-confirmation">
										<span>읽음</span> <span class="confirmation-number">{read-count}</span>
									</div>
								</div>

							</div>
							<!-- //post-card-container -->
						</div>
						<div class="post-card-footer js-comment-area">
							<div class="comment-header">
								<button type="button"
									class="js-remark-prev-button comment-more-button {remark-over-yn}">
									이전 댓글 더보기</button>
							</div>
							<ul class="post-comment-group">{remark-area}
							</ul>
						</div>
						<div class="js-remark-layer js-edit-layer comment-input-wrap">
							<div class="comment-thumbnail">
								<span class="thumbnail size40 radius16" {self-profile-url}=""></span>
							</div>
							<form
								class="js-remark-form comment-container on {admin-write-yn}">
								<fieldset>
									<legend class="blind">댓글 입력</legend>
									<div class="js-remark-area js-paste-layer comment-input"
										contenteditable="{remark-contenteditable}"
										placeholder="{remark-placeholder}"></div>
									<input type="hidden" class="comment-upload-input"> <label
										mouseover-text="파일 첨부"
										class="js-remark-upload-button comment-upload-button js-mouseover">
										<i class="icons-link"> <span class="blind">업로드 버튼</span>
									</i>
									</label>
									<div contenteditable="true"
										class="js-dimd-layer comment-upload-dimd d-none">
										<span class="dimd-text">첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</span>
									</div>
								</fieldset>
								<ul class="js-remark-upload-file upload-document-group">{file-area}
								</ul>
								<ul class="js-remark-upload-img comment-upload-img">{image-area}
								</ul>
							</form>
						</div>
					</div>
					<button type="button" class="post-popup-button right"></button>
				</div>

			</div>
		</li>
	</div>
	<div id="detailItemPack" class="d-none">
		<div id="imageComponent" class="d-none">
			<div class="js-post-img document-item image-item" data-code="IMAGE"
				atch_srno="{ATCH_SRNO}" rand_key="{RAND_KEY}"
				file_idnt_id="{RAND_KEY}" use_intt_id="{USE_INTT_ID}"
				img_path="{IMG_PATH}" atch_url="{ATCH_URL}"
				file_down_url="{FILE_DOWN_URL}" thum_img_path="{THUM_IMG_PATH}"
				file_nm="{FILE_NM}" file_size="{FILE_SIZE}" rgsr_nm="{RGSR_NM}"
				rgsn_dttm="{RGSN_DTTM}" cloud_yn="Y" width="{WIDTH}"
				height="{HEIGHT}">
				<div class="full-area">
					<div class="upload-img-area full-area">
						<img class="upload-img {image_class}" {image_src}="">
					</div>
					<button type="button" class="js-del-btn delete-button d-none">
						<i class="icons-delete-3"> <span class="blind">삭제 버튼</span>
						</i>
					</button>
					<div class="move-button">
						<i class="icons-move-2"></i>
					</div>
				</div>
			</div>
		</div>
		<div id="fileComponent" class="d-none">
			<div class="js-post-file document-item file-item" data-code="FILE"
				atch_srno="{ATCH_SRNO}" rand_key="{RAND_KEY}"
				file_idnt_id="{RAND_KEY}" file_nm="{FILE_NM}"
				file_size="{FILE_SIZE}" rgsr_nm="{RGSR_NM}" rgsn_dttm="{RGSN_DTTM}"
				use_intt_id="{USE_INTT_ID}" atch_url="{ATCH_URL}"
				img_path="{ATCH_URL}" file_down_url="{FILE_DOWN_URL}" cloud_yn="Y">
				<div class="extension-icon-area">
					<i class="icon-extension {ext-class}"></i> <span class="file-lock"
						{lock-icon-display}=""><i class="icons-lock"></i></span>
					<!-- 잠금파일일 경우에 block처리 요청 -->
				</div>
				<dl class="document-item-info">
					<dt class="js-file-title">
						<span class="document-title">{name}</span><em
							class="document-extension">{ext}</em>
					</dt>
					<dd>{size}</dd>
				</dl>
				<button type="button" class="js-down-btn document-download-button"
					{download-button-display}="">
					<i class="icons-arrow_down"></i> <span class="blind">다운로드 버튼</span>
				</button>
				<button type="button" class="js-del-btn delete-button d-none">
					<i class="icons-delete-2"></i>
				</button>
				<div class="move-button">
					<i class="icons-move-2"> </i>
				</div>
			</div>
		</div>
		<div id="mapComponent" class="d-none">
			<div class="js-map-item post-media" data-code="MAP" data-url="{URL}">
				<div class="post-media-icon">
					<i class="icon-media map"></i>
				</div>
				<dl class="post-media-content">
					<dt>{title}</dt>
					<dd>{place}</dd>
				</dl>
			</div>
		</div>
		<div id="bigMapComponent" class="d-none">
			<div class="js-map-item url-preview map map-item" data-url="{URL}"
				data-code="MAP">
				<div class="sort-hide-area">
					<img {src}="" alt="{title}">
				</div>
				<button type="button" class="js-del-btn delete-button d-none">
					<i class="icons-delete-2"></i>
				</button>
				<div class="move-button">
					<i class="icons-move-2"></i>
				</div>
				<div class="url-preview-content">
					<em class="url-preview-title"><i class="icon-map"></i>{title}</em>
					<p class="url-preview-text">{place}</p>
				</div>
			</div>
		</div>
		<div id="linkComponent" class="d-none">
			<a class="js-direct-href post-media" data-preview-url="{url}"
				data-code="LINK">
				<div class="post-media-icon">
					<i class="icon-media {link-gb}"></i>
				</div>
				<dl class="post-media-content">
					<dt>{title}</dt>
					<dd>{contents}</dd>
				</dl>
			</a>
		</div>
		<div id="overBigLinkComponent" class="d-none">
			<div class="url-link link-item url-preview map" data-code="LINK">
				<div class="js-direct-href" data-preview-url="{url}">
					<img {src-image-url}="" alt="{title}">
				</div>
				<div class="url-preview-content">
					<em class="url-preview-title">{title}</em>
					<p class="url-preview-text">{contents}</p>
				</div>
				<button type="button" class="js-del-btn delete-button d-none">
					<i class="icons-delete-2"></i>
				</button>
				<div class="move-button">
					<i class="icons-move-2"></i>
				</div>
			</div>
		</div>
		<div id="bigLinkComponent" class="d-none">
			<div class="url-link link-item" data-code="LINK">
				<a class="js-direct-href" data-preview-url="{url}">
					<div class="url-preview">
						<!-- 동영상 링크일 때 .url-video 클래스 추가-->
						<div class="url-preview-content">
							<em class="url-preview-title">{title}</em>
							<p class="url-preview-text">{contents}</p>
						</div>
						<!-- 링크일 때, 이미지 썸네일 노출 -->
						<div class="url-preview-img" {image}="" {link-image-display}="">
							<span class="blind">링크 미리보기 이미지</span>
						</div>
						<!-- 동영상 링크일 때-->
						<div class="video-wr" {link-video-display}="">
							<iframe {src-video-url}="" frameborder="0" width="603px"
								height="338px"></iframe>
						</div>
					</div>
				</a>
				<button type="button" class="js-del-btn delete-button d-none">
					<i class="icons-delete-2"></i>
				</button>
				<div class="move-button">
					<i class="icons-move-2"></i>
				</div>
			</div>
		</div>
		<div id="taskComponent" class="d-none">
			<div class="js-task-option">
				<ul class="create-content-group">
					<li class="js-status-layer">
						<div class="create-content-cell title">
							<i class="icon-post-status"></i>
						</div>
						<div class="create-content-cell">
							<div
								class="js-task-state state-button-group clearfix {status-code}"
								data-status="{status-code}">
								<button type="button" class="js-stts task-state-button request"
									stts="request">요청</button>
								<button type="button" class="js-stts task-state-button progress"
									stts="progress">진행</button>
								<button type="button" class="js-stts task-state-button feedback"
									stts="feedback">피드백</button>
								<button type="button"
									class="js-stts task-state-button completion" stts="completion">
									완료</button>
								<button type="button" class="js-stts task-state-button hold"
									stts="hold">보류</button>
							</div>
						</div>
					</li>
					<li class="js-task-worker-layer js-more-task-li d-none"
						{data-worker-layer-display}="">
						<div class="create-content-cell title manager">
							<i class="icon-post-worker"></i>
						</div>
						<div class="create-content-cell manager-btn-group">
							<span class="js-workers manager-group">{workers} </span>
							<button type="button" class="js-worker-button add-manager-button">
								{manager-text}</button>
						</div>
					</li>
					<li
						class="js-date-layer js-start-date-layer js-more-task-li d-none"
						{start-date-text-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-date"></i>
						</div>
						<div class="js-date-option create-content-cell">
							<div class="js-pickr-layer js-start-flatpickr">
								<label type="button" class="js-date-label add-manager-button"
									{start-date-button-display}=""> <input
									class="js-pickr-date flatpickr-input ie-pickr" tye="text"
									placeholder="시작일 추가" readonly="readonly"
									value="{platpickr-start-date}">
								</label>
								<div class="js-date-back-layer date-bg d-none"
									{start-date-text-display}="">
									<span class="js-pickr-text task-date"> <span
										class="js-date-text">{start-date}</span>
									</span>
									<button type="button" class="js-remove-date remove-button"></button>
								</div>
							</div>
						</div>
					</li>
					<li class="js-date-layer js-end-date-layer js-more-task-li d-none"
						{end-date-text-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-date"></i>
						</div>
						<div class="js-date-option create-content-cell">
							<div class="js-pickr-layer js-end-flatpickr">
								<label type="button" class="js-date-label add-manager-button"
									{end-date-button-display}=""> <input
									class="js-pickr-date flatpickr flatpickr-input ie-pickr"
									type="text" placeholder="마감일 추가" readonly="readonly"
									value="{platpickr-end-date}">
								</label>
								<div class="js-date-back-layer date-bg d-none"
									{end-date-text-display}="">
									<span class="js-pickr-text task-date {dead-line-class}">
										<span class="js-date-text">{end-date}</span>
									</span>
									<button type="button" class="js-remove-date remove-button"></button>
								</div>
							</div>
						</div>
					</li>
					<li class="js-priority-layer js-more-task-li" {priority-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-rank"></i>
						</div>
						<div class="js-priority create-content-cell"
							data-priority="{priority-code}">
							<button id="priorityButton" type="button"
								class="js-priority-button js-priority-event add-manager-button"
								{priority-button-display}="">우선순위 추가</button>
							<div id="prioritySpan"
								class="js-priority-span js-priority-event rank-item"
								{priority-text-display}="">
								<i class="icons-{priority-gb} small"></i> <span
									class="js-priority-text">{priority-text}</span>
								<button type="button" class="js-remove-priority remove-button"></button>
							</div>
							<div
								class="js-priority-setting-layer js-priority-event priority-group d-none">
								<button type="button"
									class="js-priority-setting-button priority-button"
									data-priority-code="low">
									<span> <i class="icons-low"></i>
									</span>낮음
								</button>
								<button type="button"
									class="js-priority-setting-button priority-button"
									data-priority-code="normal">
									<span> <i class="icons-normal"></i>
									</span>보통
								</button>
								<button type="button"
									class="js-priority-setting-button priority-button"
									data-priority-code="high">
									<span> <i class="icons-high"></i>
									</span>높음
								</button>
								<button type="button"
									class="js-priority-setting-button priority-button"
									data-priority-code="argent">
									<span> <i class="icons-argent"></i>
									</span>긴급
								</button>
							</div>
						</div>
					</li>
					<li class="js-progress-layer js-more-task-li {progress-class}"
						{progress-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-progress"></i>
						</div>
						<div class="js-progress create-content-cell">
							<div class="js-progress-bar progress-graph-bar"
								{progress-width}="" data-progress="{progress-code}"></div>
							<div class="progress-graph">{progress}</div>
							<span class="js-progress-text progress-txt">{progress-code}
								%</span>
						</div>
					</li>
				</ul>
				<button type="button" class="js-more-button add-button"
					{more-button-display}="">
					<i class="icons-plus-7"></i>항목추가입력
				</button>
			</div>
		</div>
		<div id="taskWorkerItem">
			<span class="manager-item"> <span class="thumbnail"></span> <span></span>
				<button type="button" class="remove-button"></button>
			</span>
		</div>
		<div id="postWrap" class="d-none">
			<div id="{id}" class="post-card-content {add-class}" {display}="">{contents}</div>
		</div>
		<div id="foldWrap" class="d-none">
			<button id="postMoreButton" type="button" class="post-more-btn"
				{more-btn-display}="">더보기</button>
			<div id="summaryFoldArea" class="content-fold" {fold-area-display}="">{fold-area}</div>
		</div>
		<div id="remarkItem" class="d-none">
			<li class="remark-item" remark-srno="{data-remark-srno}"
				data-user-id="{comment-user-id}">
				<div class="comment-thumbnail js-comment-thumbnail">
					<span class="thumbnail size40 radius16" {profile}=""></span>
				</div>
				<div class="js-remark-view comment-container on {admin-write-yn}">
					<div class="comment-user-area">
						<div class="comment-user">
							<span class="user-name js-comment-user-name">{name}</span> <span
								class="user-position">{position}</span> <span
								class="record-date">{date}</span>
							<div class="js-remark-like comment-like {emt-self-yn}">
								<span class="js-remark-like-button"><em class="txt-like">{emt-button-text}</em></span>
								<span class="js-remark-like-count comment-like-count {like-yn}">{like-count}</span>
							</div>
						</div>
						<div class="comment-writer-menu">
							<button type="button"
								class="js-remark-update js-remark-edit-button comment-writer-button {modify-yn}">
								수정</button>
							<button type="button"
								class="js-remark-delete js-remark-edit-button comment-writer-button {delete-yn}">
								삭제</button>
						</div>
					</div>
					<div class="js-remark-layer comment-content">
						<div class="comment-text-area">
							<div class="js-remark-text comment-text">{contents}</div>
						</div>
						<ul class="js-remark-upload-file upload-document-group">{file-area}
						</ul>
						<ul class="js-remark-upload-img comment-upload-img">{image-area}
						</ul>
					</div>
				</div>
				<div class="js-remark-edit comment-container">
					<div class="js-remark-layer comment-content modify">
						<form class="js-remark-form comment-text-area">
							<fieldset>
								<legend class="blind">댓글 입력</legend>
								<div class="js-remark-area js-paste-layer comment-input"
									contenteditable="{remark-contenteditable}"
									placeholder="{remark-placeholder}"></div>
								<div contenteditable="true"
									class="js-dimd-layer comment-upload-dimd d-none">
									<span class="dimd-text">첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</span>
								</div>
								<input type="hidden" class="comment-upload-input"> <label
									mouseover-text="파일 첨부"
									class="js-remark-upload-button comment-upload-button js-mouseover">
									<i class="icons-link"> <span class="blind">업로드 버튼</span>
								</i>
								</label>
							</fieldset>
						</form>
						<ul class="js-remark-upload-file upload-document-group">{file-area}
						</ul>
						<ul class="js-remark-upload-img comment-upload-img">{image-area}
						</ul>
					</div>
					<div class="comment-like-area d-none">
						<div class="js-remark-like comment-like {emt-self-yn}">
							<span class="js-remark-like-button"><em class="txt-like">{emt-button-text}</em></span>
							<span class="js-remark-like-count comment-like-count {like-yn}">{like-count}</span>
						</div>
					</div>
				</div>
			</li>
		</div>
		<div id="todoComponent" class="d-none">
			<div class="todo-progress-area">
				<div class="todo-progress-header">
					<div class="progress-header-left">
						<span id="progressCount" class="progress-count">{checked-count}</span>
						<span id="progressTotalCount" class="progress-total">{total-count}</span>
					</div>
					<div class="progress-header-right">
						<span class="progress-percent">{percent}%</span>
					</div>
				</div>
				<div class="todo-progress-bar">
					<span {percent-style}=""></span>
					<!-- style="width:20%" -->
				</div>
			</div>
			<ul id="todoUl" class="todo-group">{todo-ul}
			</ul>
			{todo-rgsr-info}
		</div>
		<div id="todoRgsrComponent" class="d-none">
			<span id="todoRgsrInfo" style="display: none" rgsr-id="{rgsr-id}"
				self-yn="{self-yn}" mngr-wr-yn="{mngr-wr-yn}"
				mngr-dsnc="{mngr-dsnc}"></span>
		</div>
		<div id="todoMenuComponent" class="d-none">
			<span id="todoDateSpan"
				class="js-pickr-layer todo-date js-mouseover {dead-line-class}"
				select-date="{select-date}" mouseover-text="{mouseover-date}"
				{tododate-data-display}="">{req-time}</span> <span
				id="participantData"
				class="js-worker-button js-registration js-mouseover thumbnail size36 radius14"
				data-worker-id="{id}" data-use-intt-id="{use-intt-id}"
				mouseover-text="{mouseover-worker}" {profile}=""
				{participant-data-display}=""> </span>
		</div>
		<div id="todoDateComponent" class="d-none">
			<span id="todoDateSpan"
				class="js-pickr-layer todo-date js-mouseover {dead-line-class}"
				select-date="" mouseover-text="{mouseover-date}"></span>
		</div>
		<div id="todoParticipantComponent" class="d-none">
			<span id="participantData"
				class="js-worker-button js-registration js-mouseover thumbnail size36 radius14"
				data-worker-id="{id}" data-use-intt-id="{use-intt-id}"
				mouseover-text="{mouseover-worker}" {profile}=""
				{participant-data-display}=""> </span>
		</div>
		<div id="todoEditComponent" class="d-none">
			<ul id="todoEditUl" class="todo-group ui-sortable"></ul>
			<div class="js-todo-edit-layer subtask-input-area todo-area">
				<input id="todoContent" type="text" class="js-todo-content-input"
					placeholder="할 일 추가 (Enter 또는 Tab) / 최대 60자" autocomplete="off"
					maxlength="60" data-empty-msg="할일 내용을 입력해주세요!" data-required-yn="Y"
					data-over-msg="할일 내용이 60자가 넘었습니다!">
				<div class="todo-menu">
					<span class="js-pickr-layer js-datepick-button subtask-button">
						<input type="hidden"
						class="flatpickr flatpickr-input js-pickr-date"
						readonly="readonly"> <span
						class="create-icon-box js-pickr-icon"><i
							class="icons-calendar"></i></span> <span class="js-pickr-text"></span>
					</span>
					<button id="todoWorkerButton" type="button"
						class="js-worker-button subtask-button">
						<span class="create-icon-box"><i class="icons-person-6"></i></span>
					</button>
				</div>
			</div>
		</div>

		<div id="todoItemComponent" class="d-none">
			<li class="todo-item" todo-list-srno="{todo-list-srno}"
				todo-srno="{todo-srno}">
				<div class="subtask-input-area todo-area {checked}">
					<i class="drag-button" {drag-button-display}=""></i>
					<p class="todo-text">
						<a href="#" class="icon-checkbox js-todo-checkbox"
							{icon-checkbox-display}=""> <i class="icons-check-2"></i>
						</a> <span class="js-todo-text-area js-mouseover"
							mouseover-text="{mouseover-title}" {todo-text-display}="">{contents}</span>
						<input
							class="todoContents js-mouseover js-close-check js-todo-content-input"
							data-gubun="newTodo" placeholder="할일을 입력하세요."
							value="{contents-value}" type="text" autocomplete="off"
							maxlength="60" data-required-yn="Y"
							data-empty-msg="할일 내용을 입력해주세요!"
							data-over-msg="할일 내용이 60자가 넘었습니다!" {contents-display}="">
					</p>
					<div class="todo-menu">{todo-menu}</div>
					<button type="button" class="remove-button"
						{remove-button-display}=""></button>
				</div>
			</li>
		</div>

		<div id="scheduleComponent" class="d-none">
			<div class="post-card-content" spellcheck="true">
				<ul class="create-content-group">
					<li class="schedule-date-li">
						<div id="editDateTimeArea" class="d-none js-schedule-date-layer">
							<div class="create-content-cell title">
								<i class="icons-calendar"></i>
							</div>
							<div class="create-content-cell">
								<div class="schedule-time">
									<div class="js-pickr-layer js-start-flatpickr">
										<input type="hidden" class="js-pickr-date" id="START_DTTM">
										<input class="js-pickr-text schedule-input" type="text"
											disabled="disabled">
									</div>
									<div class="js-pickr-layer js-end-flatpickr">
										<input type="hidden" class="js-pickr-date" id="END_DTTM">
										<input class="js-pickr-text schedule-input" type="text"
											disabled="disabled">
									</div>
									<div class="oneday">
										<input type="checkbox" id="ondDay" class="d-none"> <label
											for="ondDay">종일</label>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li class="js-attendance-layer"><input
						class="js-attendance-input" data-attendance="{attendance-list}"
						style="display: none">
						<div class="create-content-cell title manager">
							<i class="icon-post-worker"></i>
						</div>
						<div class="create-content-cell manager-btn-group">
							<span class="js-manager-group manager-group">{attendance}</span>
							<button type="button" class="js-worker-button add-manager-button">

								{addAttendenceText}</button>
							<div id="attendanceCount" class="attendee-status"
								{attendance-count-display}="">
								<span class="attendee-status-text participate"><span>참석</span><em>{attendance-count}</em></span>
								<span class="attendee-status-text absence"><span>불참</span><em>{nonattendance-count}</em></span>
								<span class="attendee-status-text undetermined"><span>미정</span><em>{undefined-count}</em></span>
							</div>
						</div></li>
					<li {place-display}="">
						<div class="create-content-cell title manager">
							<i class="icon-post-place"></i>
						</div>
						<div class="create-content-cell">
							<input id="placeInput" type="text"
								class="place-input js-close-check d-none" data-required-yn="Y"
								autocomplete="off" placeholder="장소를 입력하세요">
							<div id="urlPreview" class="url-preview-content schedule">
								<em class="url-preview-title"> <span class="ellipsis">{place}</span>
									<button type="button" class="js-place-span map-button"
										data-map-link="{map-link}" {map-display}="">지도보기</button>
								</em>
							</div>
							<div id="placeSpan" class="js-place-span url-preview map"
								data-map-link="{map-link}" {map-display}="">
								<div>
									<img id="mapImage" {map-image-src}="" alt="게시물 이미지">
								</div>
								<input id="LOCATION" type="hidden">
							</div>
						</div>
					</li>
					<li id="videoLi" {video-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-video"></i>
						</div>
						<div class="create-content-cell">
							<button id="videoButton" type="button"
								class="add-manager-button {video-active}">화상 회의 추가</button>
							<span id="videoSpan" data-vc-srno="{VC_SRNO}">
								<div id="zoomButton" class="video-conference-join" tabindex="0">
									Zoom으로 참여하기
									<button type="button" class="remove-button d-none">
										<i class="icon-post-cancel"></i>
									</button>
								</div>
								<div id="zoomUrlCopy" class="video-conference-join" tabindex="0">
									<span class="link-copy"><i class="icons-copy"></i></span> 링크 복사
								</div>
							</span>
						</div>
					</li>
					<li {alam-display}="">
						<div class="create-content-cell title">
							<i class="icon-post-alarm"></i>
						</div>
						<div class="create-content-cell">
							<span id="alarmSpan" class="alarm-text">{alarm_time}</span> <select
								id="alarmButton" class="alarm-select d-none"></select>
						</div>
					</li>
					<li {memo-display}="">
						<div class="create-content-cell title manager memo">
							<i class="icon-post-memo"></i>
						</div>
						<div class="create-content-cell memo">
							<p class="memo-span" id="memoSpan">{memo}</p>
							<div id="memoButton"
								class="js-upload-area js-paste-layer memo d-none"
								contenteditable="true" data-required-yn="Y"
								placeholder="메모를 입력하세요."></div>
						</div>
					</li>
				</ul>
			</div>
			<div id="attendanceSelect" class="attendance-button-group"
				{attendance-select-display}="">
				<button class="attendance-button participate {participate-status}"
					data-status="participate">참석</button>
				<button class="attendance-button absence {absence-status}"
					data-status="absence">불참</button>
				<button class="attendance-button undetermined {undetermined-status}"
					data-status="undetermined">미정</button>
			</div>
		</div>
		<div id="postEditWrap" class="d-none">
			<div class="js-popup-before edit-item create-post-wrap"
				data-code="{data-code}">
				{post-dimd-layer}
				<div class="create-post-header">
					<h4 class="create-post-title">???front.detailItem.writePost???</h4>
					<div id="selectedProject"
						class="js-project-selectable-header add-project-header d-none">
						<h3 class="card-popup-title">
							<i id="selectProjectIcon" class="project-color"></i> <span
								id="selectedProjectNm" class="subtask-title">프로젝트 선택</span> <input
								type="hidden" id="selectedProjectSrno" value="">
						</h3>
					</div>
					<button type="button" class="btn-close">
						<i class="icons-close-1"><span class="blind">닫기</span></i>
					</button>
				</div>
				<div class="share-header" style="display: none">
					<i class="btn-back"></i>
					<div
						class="color-code flow-content-list flow-content-po-t small-color"
						data-color="11"></div>
					<span class="project-ttl"></span>
					<button type="button" class="btn-close">
						<i class="icons-close-1"><span class="blind">닫기</span></i>
					</button>
				</div>
				<ul class="js-post-nav create-post-nav {nav-class} {post-gb}">
					<li class="js-post-type-item" data-post-code="1">
						<button type="button" class="create-tab tab-write" role="tab">
							<i class="icons-write2"></i><span>글</span>
						</button>
					</li>
					<li class="js-post-type-item" data-post-code="4">
						<button type="button" class="create-tab tab-task" role="tab">
							<i class="icons-task"></i><span>업무</span>
						</button>
					</li>
					<li class="js-post-type-item" data-post-code="3">
						<button type="button" class="create-tab tab-schedule" role="tab">
							<i class="icons-schedule"></i><span>일정</span>
						</button>
					</li>
					<li class="js-post-type-item" data-post-code="2">
						<button type="button" class="create-tab tab-todo" role="tab">
							<i class="icons-todo"></i><span>할 일</span>
						</button>
					</li>
				</ul>
				<div class="create-post-container scroll-mask">
					<div>
						<fieldset>
							<legend class="blind">게시물 작성 영역</legend>
							<div class="{title-display}">
								<input id="postTitle" type="text" title="제목을 입력하세요."
									placeholder="제목을 입력하세요." autocomplete="off"
									data-required-yn="Y" class="js-post-title create-title-input"
									maxlength="100" data-empty-msg="제목을 입력하세요!">
							</div>
							<div id="postCntn"
								class="js-content-area create-content-area {post-code}">
								<div id="styleTagItem" class="font-style-toolbar d-none">
									<button id="styleTagBold" type="button"
										class="font-style-button">
										<i class="icons-font-style bold"></i>
									</button>
									<button id="styleTagItalic" type="button"
										class="font-style-button">
										<i class="icons-font-style italic"></i>
									</button>
									<button id="styleTagUnderLine" type="button"
										class="font-style-button">
										<i class="icons-font-style underline"></i>
									</button>
									<button id="styleTagLineThrough" type="button"
										class="font-style-button">
										<i class="icons-font-style line-through"></i>
									</button>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
				<div class="create-post-footer clearfix">
					<ul class="js-bottom-ul create-button-group clearfix">
						<li class="js-bottom-item" data-code="upload-file">
							<button mouseover-text="파일 첨부"
								class="js-file-button js-mouseover">
								<i class="icons-link"></i>
							</button>
							<div class="js-file-menu upload-menu d-none">
								<button class="js-file-option" data-upload="pc">
									<i class="icon-pc"></i>내 컴퓨터
								</button>
								<button class="js-file-option" data-upload="gdrive"
									{button-upload-google}="">
									<i class="icon-gdrive"></i>구글 드라이브
								</button>
								<button class="js-file-option" data-upload="dropbox"
									{button-upload-dropbox}="">
									<i class="icon-dropbox"></i>드롭박스
								</button>
								<button class="js-file-option" data-upload="flowdrive"
									{button-upload-importfile}="">
									<i class="mini-flowdrive"></i>파일함
								</button>
							</div>
						</li>
						<li class="js-bottom-item" data-code="google-place">
							<button mouseover-text="장소 첨부" class="js-map-button js-mouseover">
								<i class="icons-map"></i>
							</button>
							<div class="js-map-menu upload-menu map-search d-none">
								<input type="text" placeholder="장소를 입력하세요"
									class="js-map-input map-search-input">
							</div>
						</li>
						<li class="js-bottom-item hashtag-item" data-code="hash-tag">
							<button>
								<i class="icons-tag"></i>
							</button>
							<div class="tooltip">해시태그 - ‘#’ 입력후 내용을 쓰고 스페이스 바로 설정</div>
						</li>
						<li class="js-bottom-item mention-item" data-code="mention-tag">
							<button>
								<i class="icons-mention"></i>
							</button>
							<div class="tooltip">멘션 - ‘@’ 입력후 이름을 쓰고 ↑,↓,Enter로 설정</div>
						</li>
						<li class="js-bottom-item text-item" data-code="style-tag">
							<button>
								<i class="icons-font"></i>
							</button>
							<div class="tooltip">굵게/기울임/밑줄/취소선 - 글내용을 드래그하여 설정</div>
						</li>
					</ul>
					<div class="create-footer-menu">
						<div
							class="private-button create-submit-option
                    {private-class}"
							{private-button-display}="">{private-text}</div>
						<ul class="create-post-option" style="display: none">
							<li>
								<div class="js-private-option option-item full"
									data-private="full">
									<i class="icons-person-7"></i>전체 공개
								</div>
							</li>
							<li>
								<div class="js-private-option option-item admin"
									data-private="admin">
									<i class="icons-lock"></i>프로젝트 관리자만
								</div>
							</li>
						</ul>
						<button class="js-complete-btn create-button create-post-submit">올리기</button>
						<div class="js-editing-buttons d-none">
							<button type="button" class="cancel-button create-post-button">취소</button>
							<button type="button"
								class="js-complete-btn edit-button create-post-button confirm">
								확인</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="postContents">
			<div class="js-upload-area create-post-content"
				contenteditable="true" placeholder="ㅣ업무내용을 입력하세요."
				spellcheck="false"></div>
		</div>
	</div>

	<div id="postAttachedItem">
		<div id="postAttached" class="post-attach">
			<div class="js-attached-url"></div>
			<div class="js-attached-image write1-wr"></div>
			<div class="js-attached-file"></div>
		</div>
	</div>

	<div id="postDimdItem" class="d-none">
		<div contenteditable="true" class="js-dimd-layer create-dimd d-none">
			<div class="dimd-content">
				<i class="upload-dimd"></i>
				<p>첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</p>
			</div>
		</div>
	</div>

	<ul id="workerListItem" class="d-none">
		<li href="#">
			<div class="js-registration all-seach-section-wrap-2"
				profile-data="{profile-data}" data-worker-id="{worker-id}"
				data-use-intt-id="{use-intt-id}">
				<div class="all-seach-popup-write-1-1"></div>
				<div class="js-worker-profile all-seach-popup-write-2" {profile}=""
					data-profile="{profile-data}"></div>
				<div class="all-seach-popup-write-all-wrap">
					<div class="all-seach-popup-write-wrap">
						<div class="js-registration-name all-seach-popup-write-3">{name}</div>
						<span class="js-registration-position">{position}</span>
					</div>
					<div class="all-seach-popup-write-wrap-2">
						<div class="js-registration-company all-seach-popup-write-5">{company}</div>
						<div class="js-registration-team all-seach-popup-write-6">{team}</div>
					</div>
				</div>
			</div>
		</li>
	</ul>

	<div id="workersPopup" class="d-none">
		<div class="js-worker-layer all-seach-popup-type-2" tabindex="0">
			<div class="search-work">
				<div class="all-popup-position-fix">
					<i class="icons-search"></i>
				</div>
				<input id="workerInput" type="text" autocomplete="off">
			</div>
			<div class="js-worker-list all-seach-section-wrap-1 scroll-mask">
				<ul></ul>
			</div>
			<div class="all-seach-popup-button-1 btn-worker">
				<a href="#">
					<div class="js-select-worker all-seach-popup-sub-button-2">선택</div>
				</a>
			</div>
		</div>
	</div>

	<div id="workerSelectCount" class="d-none">
		<div class="js-select-alert all-file-alert-type-2">
			<span class="js-select-count"></span> <em class="js-select-cancel"></em>
		</div>
	</div>

	<div id="taskSelectedWorkerItem" class="d-none">
		<span class="js-registration manager-item"
			data-worker-id="{WORKER_ID}" data-worker-profile="{WORKER_PRFL_PHTG}"
			data-worker-name="{WORKER_NM}"> <span
			class="js-worker-profile thumbnail" {profile}=""></span> <span
			class="js-registration-name">{WORKER_NM}</span>
			<button type="button" class="js-remove-worker remove-button"></button>
		</span>
	</div>

	<div id="projectSelectableLayer" class="d-none">
		<div class="invite-popup-type-4 js-hide-popup-area">
			<div class="name-type-seach-popup-header-type-1">
				<span class="js-share-popup-ttl"></span>
				<button class="close-button btn-close">
					<i class="icons-close-1"></i>
				</button>
			</div>
			<div class="search-wr">
				<i class="icon-search"></i> <input type="text"
					class="js-share-project-srch coperate-input-type-2"
					placeholder="프로젝트명으로 검색">
			</div>
			<div class="team-wrap-invite-type-1 share-popup scroll-mask">
				<div class="share-tab" style="display: none">
					<a href="#">
						<div class="team-job-invite-type-2">프로젝트</div>
					</a> <a href="#">
						<div class="team-job-invite-type-1">채팅</div>
					</a>
				</div>
				<div class="content-wr">
					<ul class="js-share-project-list share-project-list section-list-1"></ul>
				</div>
			</div>
			<div class="js-project-select menu-text-popup-1"
				style="display: none">
				<span class="select-count">0</span><span>개 프로젝트가 선택되었습니다.</span> <em
					class="select-clear">선택취소</em>
			</div>
			<div class="button-wr share-button">
				<button class="btn-cancel">취소</button>
				<button class="btn-submit">확인</button>
			</div>
		</div>
	</div>
	<div id="reactionCheckPopup" class="d-none">
		<div
			class="js-reaction-check-layer reaction-check-popup name-type-seach-popup-type-1">
			<div class="name-type-seach-popup-type-1" tabindex="1">
				<div class="name-type-seach-popup-header-type-1">
					<span>좋아요 확인</span>
					<button class="btn-close js-close-event">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="js-total-reaction total-reaction">
					<span class="reaction-emoji-item"> <i
						class="icon-emoji like"><span class="blind">좋아요</span></i> <strong
						class="js-emoji-count"></strong>
					</span> <span class="reaction-emoji-item"> <i
						class="icon-emoji please"><span class="blind">부탁해요</span></i> <strong
						class="js-emoji-count"></strong>
					</span> <span class="reaction-emoji-item"> <i
						class="icon-emoji sad"><span class="blind">힘들어요</span></i> <strong
						class="js-emoji-count"></strong>
					</span> <span class="reaction-emoji-item"> <i
						class="icon-emoji great"><span class="blind">훌륭해요</span></i> <strong
						class="js-emoji-count"></strong>
					</span> <span class="reaction-emoji-item"> <i
						class="icon-emoji thank"><span class="blind">훌륭해요</span></i> <strong
						class="js-emoji-count"></strong>
					</span>
					<div class="total-emoji">
						<em>총</em> <strong class="js-total-emoji-count"></strong>
					</div>
				</div>
				<ul class="js-reaction-participants participants-list reaction-box">
					<!-- .reaction-box 클래스 추가 -->
				</ul>
			</div>
		</div>
	</div>
	<div id="reactionCheckItem" class="d-none">
		<li class="js-reaction-check-item" data-user-id="{RCVR_USER_ID}">
			<div class="post-author">
				<i class="icon-emoji {EMT_CD}"><span class="blind">{EMOJI_TEXT}</span></i>
				<span class="thumbnail size40 radius16" {profile_url}=""></span>
				<dl class="post-author-info">
					<dt>
						<strong class="author ellipsis">{RCVR_USER_NM}</strong> <em
							class="position ellipsis">{JBCL_NM}</em>
					</dt>
					<dd>
						<strong class="company ellipsis">{RCVR_CORP_NM}</strong> <span
							class="team ellipsis">{RCVR_DVSN_NM}</span>
					</dd>
				</dl>
			</div>
		</li>
	</div>
	<div id="readCheckPopup" class="d-none">
		<div
			class="js-read-check-layer read-confirmation name-type-seach-popup-type-1"
			tabindex="1">
			<div class="name-type-seach-popup-header-type-1">
				<span>읽음확인</span>
				<button class="btn-close js-close-event">
					<i class="icons-close-1"></i>
				</button>
			</div>
			<div class="project-search">
				<i class="icons-search"></i> <input type="text"
					placeholder="참여자명으로 검색" autocomplete="off"
					class="project-search-input">
			</div>
			<div class="js-read-tab team-wrap-invite-type-1">
				<a href="#">
					<div data-code="READ"
						class="js-read-tab-item team-job-invite-type-2 btn">읽음</div>
				</a> <a href="#">
					<div data-code="UNREAD"
						class="js-read-tab-item team-job-invite-type-1 btn">미확인</div>
				</a>
			</div>
			<ul class="participants-list reaction-box scroll-mask">
				<!-- .reaction-box 클래스 추가 -->
			</ul>
		</div>
	</div>
	<div id="readCheckItem" class="d-none">
		<li class="reader-item" data-user-id="{RCVR_USER_ID}">
			<div class="post-author">
				<span class="thumbnail size40 radius16" {profile-url}=""></span>
				<dl class="post-author-info">
					<dt>
						<strong class="author ellipsis">{RCVR_USER_NM}</strong> <em
							class="position ellipsis">{JBCL_NM}</em>
					</dt>
					<dd>
						<strong class="company ellipsis">{RCVR_CORP_NM}</strong> <span
							class="team ellipsis">{RCVR_DVSN_NM}</span>
					</dd>
				</dl>
				<div class="read-section">
					<strong id="readText">{read-text}</strong>
					<p>{read-time}</p>
				</div>
			</div>
		</li>
	</div>
	<div id="subTaskAreaItem" class="d-none">
		<div class="subtask-space">
			<div class="js-subtask-area subtask-wrap">
				<div class="subtask-header">
					<span class="subtask-title"> <i class="icons-subtask"></i>하위업무<em
						class="js-subtask-count subtask-count">{subtask_count}</em>
					</span>
				</div>
				<ul class="js-subtask-ul subtask-list ui-sortable"
					style="display: block" data-project-srno="{COLABO_SRNO}"
					data-post-srno="{COLABO_COMMT_SRNO}">{SUBTASK_LIST}
				</ul>
				<div class="subtask-bottom js-subtask-edit-layer">
					{EDIT_LAYER}</div>
				<button type="button" class="js-add-subtask-button add-button">
					<i class="icons-plus-7"></i>하위업무 추가
				</button>
			</div>
		</div>
	</div>
	<div id="subTaskItem" class="d-none">
		<li id="subtask-{COLABO_COMMT_SRNO}"
			class="js-subtask-li {status-class}" index="{index}"
			task-srno="{TASK_SRNO}" data-project-srno="{COLABO_SRNO}"
			data-post-srno="{COLABO_COMMT_SRNO}" data-del-yn="{del-yn}">
			<div class="subtask-input-area">
				<i class="drag-button"> <span class="blind">Move</span>
				</i>
				<div
					class="js-subtask-status-layer js-subtask-layer subtask-status-area">
					<button type="button"
						class="js-subtask-status-button js-task-state subtask-button subtask-status {status_code}"
						data_status="{STTS}">{status_text}</button>
					<ul class="js-status-setting-layer subtask-status-list"
						style="display: none">
						<li>
							<div class="js-status-setting-button subtask-status request"
								data_status_code="0">요청</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status progress"
								data_status_code="1">진행</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status feedback"
								data_status_code="4">피드백</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status completion"
								data_status_code="2">완료</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status hold"
								data_status_code="3">보류</div>
						</li>
					</ul>
				</div>
				<div class="subtask-input">
					<p class="subtask-title js-mouseover">{TASK_NM}</p>
					<input class="subtask-title js-subtask-input js-mouseover"
						tab-code="input" maxlength="50" data-empty-msg="하위 업무 제목을 입력하세요!"
						data-required-yn="Y" value="{TASK_NM}" {readonly_yn}=""> <span
						class="subtask-comment" {remark_display}=""><i
						class="icons-comment2"></i><span class="js-subtask-remark-count">{REMARK_CNT}</span></span>
				</div>
				<ul class="js-subtask-menu subtask-menu">
					<li
						class="js-subtask-date-layer subtask-menu-date js-date-tooltip {mouseover-class}"
						tab-code="date" mouseover-text="{mouseover-date}"
						data_start_dt="{START_DT}" data_end_dt="{END_DT}">
						<div class="js-pickr-layer">
							<input type="hidden" class="js-subtask-date-input"
								readonly="readonly">
							<div class="subtask-date-input-div">
								<button type="button"
									class="js-subtask-date-button subtask-button create-icon-box small {date_off}"
									tab-code="date" {date_button_display}="">
									<span> <i class="icons-calendar"></i>
									</span>
								</button>
								<span
									class="js-subtask-date-text js-flatpicker subtask-date d-none {dead-line-class}"
									{date_text_display}="">{end_dt_text}</span>
							</div>
						</div>
					</li>
					<li
						class="js-subtask-priority-layer js-subtask-layer subtask-menu-priority js-mouseover"
						tab-code="priority" mouseover-text="{mouseover-priority}"
						data_priority="{PRIORITY}">
						<button type="button"
							class="js-priority-level icon-subtask-level js-priority-button {priority_code}"
							{priority_icon_display}="">
							<em class="blind"></em>
						</button>
						<button type="button"
							class="js-priority-button js-subtask-priority subtask-button create-icon-box small {priority_off}"
							tab-code="priority" {priority_button_display}="">
							<span> <i class="icons-low"></i>
							</span>
						</button>
					</li>
					<li
						class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
						tab-code="worker" data_worker_id_list="{worker_id_list}"
						data_worker_name_list="{worker_name_list}"
						data_worker_profile_list="{data_worker_profile_list}"
						mouseover-text="{mouseover-worker}">
						<button type="button"
							class="js-worker-button subtask-button manager js-worker-box create-icon-box small {worker_off}"
							tab-code="worker" {worker_button_display}="">
							<span> <i class="icons-person-6 small"></i>
							</span>
						</button>
						<button type="button"
							class="js-worker-button subtask-button manager js-worker-thumb create-icon-box small d-none"
							tab-code="worker" {worker_icon_display}="">
							<span class="subtask-manager-area"> <span
								class="js-thumb-image thumbnail" {thumbnail_image}=""></span> <span
								class="subtask-manager-number d-none" {worker_count_display}="">{worker_count}</span>
							</span>
						</button>
					</li>
				</ul>
				<button type="button" class="subtask-register-btn off">
					<span class="blind">등록</span>
				</button>
				<button type="button" class="js-subtask-remove remove-button"
					{remove_display}="">
					<span class="blind">삭제</span>
				</button>
				<div class="js-priority-setting-layer priority-group d-none">
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="0" data_priority_code="">
						<span> <i class="icons-delete small lv0"></i>
						</span>취소
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="1" data_priority_code="0">
						<span> <i class="icons-low small lv1"></i>
						</span>낮음
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="2" data_priority_code="1">
						<span> <i class="icons-normal small lv2"></i>
						</span>보통
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="3" data_priority_code="2">
						<span> <i class="icons-high small lv3"></i>
						</span>높음
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="4" data_priority_code="3">
						<span> <i class="icons-argent small lv4"></i>
						</span>긴급
					</button>
				</div>
			</div>
		</li>
	</div>

	<div id="subtaskInputItem" class="d-none">
		<div class="subtask-registered-area js-subtask-edit-area">
			<div class="subtask-input-area js-subtask-li">
				<div
					class="js-subtask-status-layer js-subtask-layer subtask-status-area">
					<button type="button"
						class="js-subtask-status-button subtask-button subtask-status request"
						data_status="0">요청</button>
					<ul
						class="js-status-setting-layer js-subtask-layer subtask-status-list"
						style="display: none">
						<li>
							<div class="js-status-setting-button subtask-status request"
								data_status_code="0">요청</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status progress"
								data_status_code="1">진행</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status feedback"
								data_status_code="4">피드백</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status completion"
								data_status_code="2">완료</div>
						</li>
						<li>
							<div class="js-status-setting-button subtask-status hold"
								data_status_code="3">보류</div>
						</li>
					</ul>
				</div>
				<input type="text" class="subtask-input js-subtask-input"
					tab-code="input" maxlength="50" data-empty-msg="하위 업무 제목을 입력하세요!"
					data-required-yn="Y" placeholder="업무명 입력 (Enter로 업무 연속 등록 가능)">
				<ul class="js-subtask-menu subtask-menu">
					<li
						class="js-subtask-date-layer subtask-menu-date js-mouseover js-date-tooltip"
						mouseover-text="마감일 추가" data_start_dt="" data_end_dt="">
						<div class="js-pickr-layer">
							<input type="hidden" class="js-subtask-date-input"
								readonly="readonly">
							<div class="subtask-date-input-div">
								<button type="button"
									class="js-subtask-date-button js-flatpicker subtask-button create-icon-box small"
									tab-code="date">
									<span> <i class="icons-calendar"></i>
									</span>
								</button>
								<span
									class="js-subtask-date-text js-flatpicker subtask-date d-none {dead-line-class}"></span>
							</div>
						</div>
					</li>
					<li
						class="js-subtask-priority-layer js-subtask-layer subtask-menu-priority js-mouseover clearfix"
						data_priority="" mouseover-text="우선 순위 추가">
						<button type="button"
							class="js-priority-level icon-subtask-level js-priority-button d-none">
							<em class="blind"></em>
						</button>
						<button type="button"
							class="js-priority-button js-subtask-priority subtask-button create-icon-box small"
							tab-code="priority">
							<span> <i class="icons-low"></i>
							</span>
						</button>

					</li>
					<li
						class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
						data_worker_id_list="" data_worker_name_list=""
						data_worker_profile_list="" mouseover-text="담당자 추가">
						<button type="button"
							class="js-worker-button subtask-button manager js-worker-box create-icon-box small"
							tab-code="worker">
							<span> <i class="icons-person-6 small"></i>
							</span>
						</button>
						<button type="button"
							class="js-worker-button subtask-button manager js-worker-thumb create-icon-box small d-none"
							tab-code="worker">
							<span class="subtask-manager-area"> <span
								class="js-thumb-image thumbnail"></span> <span
								class="subtask-manager-number d-none">{worker_count}</span>
							</span>
						</button>
					</li>
				</ul>
				<button type="button" class="js-subtask-enter-button subtask-enter">
					<i class="icons-reply"></i>
				</button>
				<button type="button" class="subtask-register-btn off">
					<span class="blind">Register</span>
				</button>
				<div class="js-priority-setting-layer priority-group d-none">
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="0" data_priority_code="">
						<span> <i class="icons-delete lv0"></i>
						</span>취소
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="1" data_priority_code="0">
						<span> <i class="icons-low lv1"></i>
						</span>낮음
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="2" data_priority_code="1">
						<span> <i class="icons-normal lv2"></i>
						</span>보통
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="3" data_priority_code="2">
						<span> <i class="icons-high lv3"></i>
						</span>높음
					</button>
					<button type="button"
						class="js-priority-setting-button js-subtask-priority priority-button"
						data-key-index="4" data_priority_code="3">
						<span> <i class="icons-argent lv4"></i>
						</span>긴급
					</button>
				</div>
			</div>
			<p class="subtask-close-text subtask-reset-text"
				style="display: block">취소하려면 Esc 키를 누르세요.</p>
		</div>
	</div>

	<div id="selectableProjectItem" class="d-none">
		<li class="project-item ui-state-default {check_yn}"
			colabo-srno="{COLABO_SRNO}"><a href="#">
				<button
					class="edit-check check-menu-item flow-content-chk {check_yn}"></button>
				<div
					class="color-code flow-content-list flow-content-po-t color-code-{BG_COLOR_CD}"
					data-color="{BG_COLOR_CD}"></div> <span
				class="project-ttl share-project-ttl">{TTL}</span>
		</a></li>
	</div>








	<div id="requestJoinPopup" class="flow-all-background-1 d-none">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div class="project-invite-popup-1">
					<div class="name-type-seach-popup-header-type-1">
						<span>참여 요청</span> <a href="#" id="closeBtn" class="btn-close"><i
							class="icons-close-1"></i></a>
					</div>
					<div class="sub-drag-picture-section-1">
						<ul id="joinParticipantUl" class="join-participant-ul">
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="joinParticipantItem" class="d-none">
		<li class="project-invite-popup-list-1 js-join-participant-item"
			data-user-id="{user-id}">
			<div class="mini-mode-text-sub-area-1">
				<div class="js-profile-image mini-mode-main-picture-1"
					{profile-image}=""></div>
				<div class="mini-mode-area-list-type-1">
					<p>
						<strong>{name}</strong>
					</p>
				</div>
				<div class="project-invite-popup-button-1">
					<a id="rejectBtn" href="#">
						<div class="project-invite-popup-button-type-1">거절</div>
					</a> <a id="acceptBtn" href="#">
						<div class="project-invite-popup-button-type-2">승인</div>
					</a>
				</div>
			</div>
		</li>
	</div>









	<div id="memberItem" style="display: none">
		<li class="js-participant-item" data-id="{rcvr-cd}"
			rcvr_cd="{rcvr-cd}" rcvr_gb="{rcvr-gb}" id="{id}"
			sendience_gb="{sendience-gb}" profile-image="{profile-image}">
			<div class="post-author">
				<span class="js-profile thumbnail size40 radius16" {profile}=""></span>
				<dl class="post-author-info">
					<dt>
						<strong id="name" class="author">{name}</strong> <em>{position}</em>
					</dt>
					<dd {personal-yn}="">
						<strong class="company">{company}</strong> <span class="team">{team}</span>
					</dd>
				</dl>
			</div>
			<div id="selectMemberBtn" class="my-check-2"></div>
			<button type="button"
				class="js-participant-chat participant-chat-button d-none">
				<i class="icons-chat"><span class="blind">채팅</span></i>
			</button> <a id="plusBtn" href="#" class="project-invite-plus-1 d-none">
				<div class="project-invite-plus-circle-1"></div>
				<div class="project-invite-plus-circle-2"></div>
				<div></div>
		</a>
			<div id="plusPopup" class="project-invite-sub-popup-1 plus-popup"
				style="display: none">
				<a id="export" href="#">
					<div class="invite-active-type-1">내보내기</div>
				</a> <a id="managerBtn" href="#">
					<div>관리자로 지정</div>
				</a>
			</div>
		</li>
	</div>




	<script src="flow-renewal/dist/js/common.min.js"></script>





	<script>
		var _COUNTRY_CODE = "ko";

		var _CHAT_URL = 'https://chat.flow.team:7820';
		var _IPT_URL = "";
		var _INNER_NETWORK_YN = 'N';
		var _CLIENT_IP = "180.71.250.238, 130.176.125.134";
		var _ENTER_YN = (Often.isServerModeByHost("DEV_TEST") ? "N" : "N");

		var _PTL_ID = "PTL_3";
		var _CHNL_ID = "CHNL_1";
		var _USE_INTT_ID = "FLOW_211013170612";
		var _USE_INTT_NM = "";
		var _USER_ID = "yuin3488@gmail.com";
		var _USER_NM = "cyr";
		var _USER_EMAIL = "yuin3488@gmail.com";
		var _RGSN_DTTM = "FLOW_clMThPKOVKBdxJgpx%2Bg1Pw%3D%3D";
		var _PRFL_PHTG = "";
		var _BSNN_NM = "";
		var _DVSN_NM = "";
		var _DVSN_CD = "";
		var _ONE_COLABO_SRNO = "1072161";
		var _BUY_YN = "";

		var CONNECT_PROJECT_SRNO = "";
		var CONNECT_POST_SRNO = "";
		var CONNECT_REMARK_SRNO = "";
		var CONNECT_INVITE_KEY = "";

		var _IsMini = location.pathname.indexOf('mini') > -1;

		var _FLOW_DRIVE_UUID = "";

		if (!Often.isServerModeByHost("REAL")
				&& !Often.isServerModeByHost("REAL_TEST")) {
			Often.setCookie("MINIFY_YN", "N");
		}

		LocalUtil.setLocal("ONLY_ENTER_YN", _ENTER_YN);

		//browser tab id 생성
		if (!sessionStorage.tabID || sessionStorage.isTab === 'ON') {
			sessionStorage.tabID = Often.getRandomDeviceId();
		}
		sessionStorage.isTab = 'ON';
		var _TAB_ID = sessionStorage.tabID;
		session2local();

		//case1. 탭이 종료될때 , 로컬에서 세션 옮겼다가 탭 종료되면 세션 데이터 날아감
		//case2. 탭이 리로드될때, 로컬에서 세션 옮겼다가 탭 리로드되면 세션에서 로컬로 데이터 옮김
		$(window).on('unload beforeunload', function(v) {
			sessionStorage.isTab = 'OFF';
			local2session();
		});

		function local2session() {
			if (location.pathname !== "/main.act"
					&& location.pathname !== "/miniMain.act")
				return;
			Object.keys(localStorage).forEach(function(v) {
				if (v.indexOf(_TAB_ID) === -1)
					return;
				sessionStorage[v] = localStorage.getItem(v);
				localStorage.removeItem(v);
			});
		}

		function session2local() {
			if (location.pathname !== "/main.act"
					&& location.pathname !== "/miniMain.act")
				return;
			Object.keys(sessionStorage).forEach(function(v) {
				if (v.indexOf(_TAB_ID) === -1)
					return;
				localStorage.setItem(v, sessionStorage[v]);
				sessionStorage.removeItem(v);
			});
		}
	</script>




	<script defer="" src="flow-renewal/dist/js/main.min.js"></script>



	<script>
		var roomConnectId;
	</script>
















	<div id="popupDraw" class="d-none">
		<div id="popupWrap">
			<div class="flow-all-background-1 back-area" tabindex="0">
				<div class="flow-project-make-1 back-area">
					<div class="flow-project-make-2 back-area contents">{contents}</div>
				</div>
			</div>
		</div>
		<div id="toastWrap" class="d-none">
			<div class="alert-wrap d-none">
				<div class="alert-type">
					<div class="text"></div>
				</div>
			</div>
		</div>
		<div id="colorPopup">
			<div class="color-popup flow-project-popup-3 d-none">
				<div class="flow-project-header-1">
					프로젝트 색상 <a href="#" class="close-event flow-close-type-1"></a>
				</div>
				<div class="flow-content">
					<div class="flow-category-option-3">
						<ul id="selectColorTypes" class="select-color-group">
							<li class="color-item project-color-type-5" color-code="5"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-11" color-code="11"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-1" color-code="1"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-10" color-code="10"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-2" color-code="2"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-7" color-code="7"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-9" color-code="9"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-6" color-code="6"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-3" color-code="3"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-4" color-code="4"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-8" color-code="8"><a
								href="#"><em></em></a></li>
							<li class="color-item project-color-type-0" color-code="0"><a
								href="#"><em></em></a></li>
						</ul>
					</div>
					<div class="flow-pop-button-type-1 margin-bottom-20">
						<button type="button" class="flow-pop-sub-button-1 cancel-event"></button>
						<button type="button" class="flow-pop-sub-button-2 submit-event"></button>
					</div>
				</div>
			</div>
		</div>
		<div id="confirmPopup">
			<div class="input-popup flow-project-popup-4 d-none">
				<div class="flow-project-header-1">
					<span class="popup-title"></span> <a href="#"
						class="close-event flow-close-type-1"></a>
				</div>
				<div class="flow-content">
					<div class="flow-content-input-1">
						<input class="popup-input" type="text" placeholder=""
							maxlength="50" data-required-yn="Y"
							data-empty-msg="라벨 이름을 입력하세요."
							data-over-msg="라벨 이름은 50자 이하로 입력해주세요.">
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 cancel-event"></div>
						</a> <a href="#">
							<div class="flow-pop-sub-button-2 submit-event"></div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div id="bigBlockPopup">
			<div class="big-block-popup experience-popup d-none">
				<dl class="experience-content">
					<dt class="popup-title"></dt>
					<dd class="popup-cont"></dd>
				</dl>
				<a class="limit-link-button submit-event"></a>
				<button type="button" class="limit-close-button close-event">
					<span class="blind">닫기</span>
				</button>
			</div>
		</div>
		<div id="blockPopup">
			<div class="limit-popup d-none">
				<dl class="limit-content">
					<dt class="popup-title"></dt>
					<dd class="popup-cont"></dd>
				</dl>
				<button id="detailLinkBtn" class="btn-detail-link d-none">자세히
					알아보기</button>
				<a class="limit-link-button submit-event"></a>
				<button type="button" class="limit-close-button close-event">
					<span class="blind">닫기</span>
				</button>
			</div>
		</div>
		<div>
			<div class="limit-popup chat-limit-popup collect">
				<dl class="limit-content">
					<dt>모아보기</dt>
					<dd>
						서비스 업그레이드를 통해<br> 자유롭게 모아보기 기능을 이용해 보세요!
					</dd>
				</dl>
				<a href="/" class="limit-link-button">서비스 업그레이드 <span
					class="d-none">버전이 되어야 하는거 아닌지?</span></a>
				<button type="button" class="limit-close-button">
					<span class="blind">닫기</span>
				</button>
			</div>
		</div>
		<div id="miniAlertPopup">
			<div
				class="mini-confirm-popup flow-project-popup-3 popup-quit d-none">
				<p class="popup-cont contents"></p>
				<div class="flow-pop-button-type-1">
					<a href="#">
						<div class="flow-pop-sub-button-1 cancel-event"></div>
					</a> <a href="#">
						<div class="flow-pop-sub-button-2 submit-event"></div>
					</a>
				</div>
			</div>
		</div>
		<div id="alertPopup">
			<div class="confirm-popup flow-project-popup-6 d-none">
				<div class="flow-content">
					<div class="flow-content-text">
						<p class="popup-cont"></p>
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 cancel-event"></div>
						</a> <a href="#">
							<div class="flow-pop-sub-button-2 submit-event"></div>
						</a>
					</div>
					<a href="#">
						<div class="flow-secondary-submit secondary-submit-event"></div>
					</a>
				</div>
			</div>
		</div>
		<div id="labelWrap" class="d-none">
			<div class="label-popup allProjLabel-popup flow-project-popup-8"
				style="display: none">
				<div class="flow-project-header-1">
					<span>프로젝트 폴더 설정</span> <a href="#"
						class="close-event flow-close-type-1"></a>
				</div>
				<ul class="js-label-ul label-set-group scroll-mask"></ul>
				<div class="flow-pop-button-type-2">
					<a href="#">
						<div class="flow-pop-sub-button-1 cancel-event">취소</div>
					</a> <a href="#">
						<div class="flow-pop-sub-button-2 submit-event">확인</div>
					</a>
				</div>
			</div>
		</div>
		<div id="pushWrap" class="d-none">
			<div
				class="push-alarm-popup allProjPushAlarm-popup flow-project-popup"
				style="display: none">
				<div class="flow-project-header-1">
					알림 설정
					<button class="js-service-helper js-mouseover"
						service-code="NOTIFICATION">
						<i class="icons-help"></i>
					</button>
					<a href="#" class="close-event flow-close-type-1"></a>
				</div>
				<div class="flow-content push-alarm-content"></div>
				<div class="flow-pop-button-type-1">
					<a href="#">
						<div class="flow-pop-sub-button-1 cancel-event">취소</div>
					</a> <a href="#">
						<div class="flow-pop-sub-button-2 submit-event">확인</div>
					</a>
				</div>
			</div>
		</div>
		<div id="profileWrap" class="d-none">
			<div class="profile-popup d-none"></div>
		</div>
		<div id="draggableForElectron">
			<div class="window_top rigVer">
				<!-- 우측정렬 class="rigVer" 추가 -->
				<div id="test" style="display: list-item; -webkit-app-region: drag;"></div>
			</div>
		</div>
		<div id="profilePopup">
			<div class="profile-header">
				<div class="profile-header-dimmed-layer"></div>
				<!-- <strong>프로필</strong> -->
				<button class="btn-close">
					<i class="icons-close-1"></i>
				</button>
			</div>
			<div class="name-card">
				<i class="profile-image js-profile-image {IMG_DEFAULT}"
					{profile_image}=""></i>
				<!--프로필 사진 미설정 시 .default 클스 추가-->
				<div class="info">
					<p class="info-box">
						<span class="name ellipsis">{USER_NAME}</span> <span
							class="position">{USER_POSITION}</span>
					</p>
					<p class="info-box">
						<span class="company">{USER_COMPANY}</span> <span
							class="department">{USER_DEPARTMENT}</span>
					</p>
				</div>
			</div>
			<div class="contact-section scroll-mask">
				<ul class="contact-contents">
					<li class="status js-user-status" {user_status_display}=""><i
						class="icon-status"></i> 상태 설정</li>
					<li><em><i class="profile-mail js-user-email"></i></em> <span>{USER_EMAIL}</span>
					</li>
					<li><em><i class="profile-phone js-user-phone"></i></em> <span>{USER_PHONE}</span>
					</li>
					<li><em><i class="profile-tell js-user-call"></i></em> <span>{USER_CALL}</span>
					</li>
					<li id="userTxt" class="txt" {li_slogan_display}=""><em><i
							class="profile-txt icon-txt js-user-txt"></i></em> <span><p>{USER_TXT}</p></span>
					</li>
				</ul>
			</div>
			<div class="btn-wr">
				<button class="btn-chat js-btn-chat">
					채팅 <i></i>
				</button>
				<button class="btn-modi js-btn-modi" {btn_modi_display}="">
					정보수정 <i></i>
				</button>
				<button class="btn-video js-btn-video" {btn_video_display}=""
					user_id="{USER_ID}">
					화상 회의 <i></i>
				</button>
			</div>
		</div>
		<div id="checkBoxPopup">
			<div class="check-box-popup popup-setting-wr d-none">
				<div class="dimmed"></div>
				<div class="flow-project-popup-5 mini">
					<div class="flow-project-header-1">
						<div class="popup-title"></div>
						<a href="#" class="flow-close-type-1 cancel-event"></a>
					</div>
					<div class="flow-content">
						<div class="flow-content-input-2">
							<input class="popup-input" type="text">
						</div>
						<div class="check-box">
							<input class="js-checkbox-input" type="checkbox"> <label
								class="js-checkbox-label"></label> <label
								class="popup-cont js-checkbox-label cursor-pointer"></label>
						</div>
						<div class="flow-pop-button-type-1 mini-button">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event">취소</div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event">확인</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="emailAuthLayer" class="d-none">
			<div
				class="auth-popup js-certification-popup flow-login-popup flow-project-popup-6 d-none">
				<div class="flow-project-header-1">
					<dt class="popup-title"></dt>
					<button class="btn-close close-event">
						<i class="icons-close-1"></i>
					</button>
				</div>
				<div class="flow-content">
					<div class="login-number-wrap">
						<p class="login-number">
							<span id="authEmail" class="popup-cont">{contents}</span> 으로
						</p>
						<p class="login-number">6자리 인증번호가 전송되었습니다.</p>
					</div>
					<div class="login-input-wrap">
						<input id="authInput" type="text" placeholder="인증번호 입력"
							class="login-popup-input" maxlength="6">
						<div class="login-text-count js-auth-counter"></div>
					</div>
					<div class="auth-error-text">
						<span id="unValidAuth" style="display: none">인증번호가 일치하지
							않습니다.</span> <span id="timeoutAuth" style="display: none">인증시간이
							만료되었습니다.</span> <span id="resendAuth" class="resend-txt"
							style="display: none; cursor: pointer;">재전송</span> <span
							id="noneNumericAuth" style="display: none">숫자만 입력해주세요</span>
					</div>
					<a href="#"><div
							class="confirm-button login-popup-button submit-event">확인</div></a>
				</div>
			</div>
		</div>
		<div id="commonLoading" class="d-none">
			<div class="loading-area">
				<div class="loading type2">
					<i class="circle"></i> <i class="circle"></i> <i class="circle"></i>
					<i class="circle"></i> <i class="circle"></i>
				</div>
			</div>
		</div>
		<div id="wrapLoading" class="d-none">
			<div class="flow-all-background-1 zindex1000 js-loading-popup">
				<div class="flow-project-make-1">
					<div class="flow-project-make-2">
						<div class="loading-popup flow-project-popup-6">
							<div class="flow-project-header-1">
								<a href="#"
									class="js-cancel-btn loading-cancel flow-close-type-1"></a>
							</div>
							<div class="flow-content">
								<div class="flow-content-text">
									<p class="popup-cont">{contents}</p>
								</div>
								<div class="loading">
									<i class="circle"></i> <i class="circle"></i> <i class="circle"></i>
									<i class="circle"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="flowNoticeDiv" class="d-none">
			<div id="flowNotice" class="popup-notice">
				<div class="top">
					<img class="js-img" src="" alt="">
				</div>
				<div class="contents">
					<strong class="tit js-ttl"></strong>
					<p class="txt js-cntn"></p>
					<button class="btn-detail js-link">자세히 알아보기</button>
				</div>
				<div class="bottom">
					<div class="js-not-show check-box">
						<input type="checkbox" id="chk2"> <label for="chk2"></label>
						다시보지 않기
					</div>
					<span class="js-close txt-close"> 닫기 </span>
				</div>
			</div>
		</div>
	</div>










	<div id="itemComponent" class="d-none">
		<div class="js-file-SearchFilter">
			<div id="periodSelectDiv">
				<div class="search-period-wr">
					<div class="js-search-pickr-layer">
						<div
							class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
							<span></span> <input type="hidden"> <label
								class="filter-date-label"><i class="icon-date"></i></label>
						</div>
						<span class="dash-swung">~</span>
						<div
							class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
							<span></span> <input type="hidden"> <label
								class="filter-date-label"><i class="icon-date"></i></label>
						</div>
					</div>
				</div>
			</div>
			<ul id="periodLi">
				<li><input id="{uuid}" type="radio" name="period-type"
					class="radio-input {select_class}" data-code="{key}" {checked}="">
					<label for="{uuid}" class="js-period-type radio-label-checkbox"
					data-code="{key}">{value}</label>{select_div}</li>
			</ul>
			<ul id="tmplLi">
				<li><input id="{uuid2}" type="radio" name="tmpl-type"
					class="radio-input" data-code="{key}" {checked}=""> <label
					for="{uuid2}" class="js-tmpl-type radio-label-checkbox"
					data-code="{key}">{value}</label></li>
			</ul>
			<ul id="fileLi">
				<li><input id="{uuid3}" type="radio" name="file-type"
					class="radio-input" data-code="{key}" {checked}=""> <label
					for="{uuid3}" class="js-file-type radio-label-checkbox"
					data-code="{key}"><i class="icon-file-type {keyClass}"></i>{value}</label>
				</li>
			</ul>
		</div>
		<div class="js-file-Alarm">
			<div id="pushSettingContentsDiv">
				<div id="pushSettingContents">
					<dl class="js-push-wrap alarm-popup-set push"
						data-push-alarm="{PUSH_ALAM_YN}">
						<dt>
							<span class="set-title"> 푸시 설정 </span>
							<button id="pushSettingBtn" type="button" class="toggle-button">
								<i class="handle"></i>
							</button>
						</dt>
						<dd class="js-push-area">
							<div class="set-subtitle">게시물 푸시</div>
							<div data-push="{PUSH_COMMT_ALAM_YN}"
								class="js-push-commt js-push-selected">
								{PUSH_COMMT_ALAM_TEXT}</div>
							<ul class="push-list js-push-list js-push-commt">
								<li class="js-push-list-item" value="Y">모두받기</li>
								<li class="js-push-list-item" value="A">나와 관련된 알림만 받기</li>
								<li class="js-push-list-item" value="N">받지 않기</li>
							</ul>
						</dd>
						<dd class="js-push-area">
							<div class="set-subtitle">댓글 푸시</div>
							<div data-push="{PUSH_REMARK_ALAM_YN}"
								class="js-push-remark js-push-selected">
								{PUSH_REMARK_ALAM_TEXT}</div>
							<ul class="push-list js-push-list js-push-remark">
								<li class="js-push-list-item" value="Y">모두받기</li>
								<li class="js-push-list-item" value="S">내가 참여한 글의 댓글 알림</li>
								<li class="js-push-list-item" value="W">내가 작성한 글의 댓글 알림</li>
								<li class="js-push-list-item" value="A">나를 언급한 글의 댓글 알림</li>
							</ul>
						</dd>
					</dl>
					<dl class="js-alarm-wrap alarm-popup-set alarm"
						data-alarm-list="{ALAM_LIST}">
						<dt>
							<span class="set-title alarm">알림 리스트 설정</span>
						</dt>
						<dd class="js-alarm-item cursor-pointer">
							<span>모두받기</span> <input type="radio" name="alarm" id="allAlarm"
								class="js-radio-input radio-input"> <label
								for="allAlarm" class="radio-label js-alarm-label js-allAlarm"></label>
						</dd>
						<dd class="js-alarm-item cursor-pointer">
							<span>나와 관련된 알림만 받기</span> <input type="radio" name="alarm"
								id="relatedAlarm" class="js-radio-input radio-input"> <label
								for="relatedAlarm"
								class="radio-label js-alarm-label js-relatedAlarm"></label>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="js-file-ItemSchedule">
			<ul id="participantItemLi">
				<li class="js-participant-item" id="participant-item">
					<div id="{id}" class="confirmation-item js-user-id">
						<div
							class="js-participant-profile participant-thumbnail attendee {gubun}"
							{profile}=""></div>
						<dl class="participant-info">
							<dt class="participant-name">
								{name}<em class="participant-position">{position}</em>
							</dt>
							<dd class="participant-detail-info">
								<strong class="participant-company">{company}</strong> <span
									class="participant-affiliation">{affiliation}</span>
							</dd>
						</dl>
						<div class="badge-area">
							<span class="badge {gubun}" {badge-display}="">{badge}</span>
						</div>
					</div>
				</li>
			</ul>
			<div id="confirmationPopupDiv">
				<div id="confirmationPopup" class="flow-all-background-1">
					<div class="flow-project-make-1">
						<div class="flow-project-make-2">
							<div id="confirmationInnerPopup"
								class="js-attendance-popup search-confirmation-popup">
								<div class="confirmation-header-top">
									<h4 class="confirmation-title">참석자 확인</h4>
									<button id="confirmationPopupCloseBtn" type="button"
										class="btn-close">
										<icon class="icons-close-1"></icon>
									</button>
								</div>
								<div class="confirmation-header-bottom">
									<div class="project-search">
										<i class="icons-search"></i> <input type="text"
											id="confirmationPopupSearchText"
											placeholder="이름 소속 연락처 내선 검색" class="project-search-input"
											autocomplete="one-time-code">
									</div>
								</div>
								<ul id="participantUl" class="confirmation-list scroll-mask"></ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="attendanceViewItem">
				<span
					class="js-registration participant-thumbnail attendee {attendance-status} js-mouseover"
					{profile}="" data-worker-id="{id}" data-registration-name="{name}"
					mouseover-text="{name}"></span>
			</div>
			<div id="attendanceEditItem">
				<span class="js-registration manager-item" data-worker-id="{id}">
					<span class="js-worker-profile thumbnail" {profile}=""></span> <span
					class="js-registration-name">{name}</span>
					<button type="button" class="js-remove-worker remove-button"></button>
				</span>
			</div>
			<div id="attendanceMoreItem">
				<span
					class="js-more-registration-button js-registration participant-thumbnail more"></span>
			</div>
		</div>
		<div class="js-file-Upload">
			<div id="fileLoadingPopupDiv">
				<div class="upload_wrap">
					<div id="upload_loading" class="article">
						<div class="type_box">
							<div class="tit">
								<p>
									<span class="js-name"></span><em></em>
								</p>
								<span class="js-count total">1/1</span>
							</div>
						</div>
						<div class="bar_area">
							<div class="bar">
								<span class="js-progress">진행률</span>
							</div>
						</div>
						<button class="btn_cancel" type="button">취소</button>
					</div>
					<div id="upload_fail" class="article type2" style="display: none;">
						<p class="imgUp">
							<img src="../design2/img_rn/ico/icon_file_error.png" alt="">
						</p>
						<div class="type_box">
							<div class="tit">
								<p>
									<em>0</em>건의 업로드 실패 내역이 있습니다.
								</p>
							</div>
						</div>
						<button class="btn_cancle" type="button">확인</button>
					</div>
				</div>
			</div>
			<div id="fileErrorPopupDiv">
				<div id="fileErrorPopup" class="layerstyle4 _postCopy_wrap"
					style="width: 420px; top: 200px; z-index: 1100;">
					<div class="layerstyle4_po">
						<div class="layerstyle4_title">
							<h3>업로드 실패</h3>
							<a class="btn_layerstyle4_close"><span class="blind">닫기</span></a>
						</div>
						<div class="layerstyle4_cont">
							<div class="pop_upload_wrap">
								<ul></ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul id="fileErrorLi">
				<li><span class="file_name">파일명</span><em>.pdf</em><span
					class="fail_info">오류</span></li>
			</ul>
		</div>
		<div class="js-file-Mention">
			<div id="mentionLayer">
				<div
					class="js-mention-layer all-seach-popup-type-2 inner-popup d-none">
					<ul class="mention-ul participants-list"></ul>
				</div>
			</div>
		</div>
		<div class="js-file-HashTag">
			<div id="hashTagLayer">
				<div class="all-seach-popup-type-2 inner-popup d-none">
					<ul class="hashtag-popup"></ul>
				</div>
			</div>
		</div>
		<div class="js-file-PostPopup">
			<div id="uploadDiv">
				<!-- Note. postCntn을 아이디로 주면 .js-content-area 영역과 id가 겹쳐짐-->
				<div class="js-upload-area js-paste-layer create-post-content"
					contenteditable="true" placeholder="ㅣ업무내용을 입력하세요."
					spellcheck="false"></div>
			</div>
		</div>
		<div class="js-file-invitePopup">
			<div id="invitePopup">
				<div class="flow-all-background-1 back-area" style="display: none">
					<div class="flow-project-make-1 back-area">
						<div class="flow-project-make-2 back-area">
							<div class="flow-project-popup-9 contents-area">
								<div class="flow-project-header-1">
									<span>초대장 확인</span>
									<button class="btn-close">
										<i class="icons-close-1"></i>
									</button>
								</div>
								<div class="invite-popup-wrap-1">
									<div class="js-prfl invite-flow-picture-1"></div>
									<div class="invite-flow-text-type-wrap-1">
										<span class="js-title invite-flow-text-type-2"></span> <em
											class="js-name invite-flow-text-type-3"></em><span
											class="invite-flow-text-type-4">님이 프로젝트에 초대합니다.</span> <span
											class="js-count invite-flow-text-type-5"></span>
									</div>
								</div>
								<div class="flow-pop-button-type-1">
									<a href="#">
										<div id="acceptBtn" class="flow-pop-sub-button-2"></div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


</body>
