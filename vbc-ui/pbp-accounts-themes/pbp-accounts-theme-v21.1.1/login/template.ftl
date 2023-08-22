<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#08B4CC">
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
      <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
      rel="stylesheet"
    />
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
  <div class="${properties.kcLoginClass!}">
        <div id="kc-header" class="${properties.kcHeaderClass!}">
                <div class="kc-logo-text"> </div>  
        </div>
    <div id="main-box">
          <div class="reg-info">
            <div class="reg-info-item">
              <div class="pbp ">
                <div class="line small-line-top"></div>
                <div class="line big-line-top"></div>
                <div class="pbp-text">
                  <span class="ms-2">
               
                    <img src="${url.resourcesPath}/img/pbpIcon.svg" />
                    
                  </span>
                  <span class="ms-3">Patient Benefit Program</span>
                </div>
                <div class="line small-line-bottom"></div>
                <div class="line big-line-bottom"></div>
              </div>
              <div class="blue-text-17">
                Cancer is beatable with the right treatment
              </div>
              <div class="blue-text-17">
                We will help you to win against cancer
              </div>
            </div>
            <div class="reg-info-item">
              <div class="targeted-immuno">
                <div>
         
                  <img src="${url.resourcesPath}/img/targetedImmunotherapy.svg" />
                </div>
                <div>
                  <div class="black-text-17">
                    Get up to <span class="percent-text">90%</span> cashback
                    for the best targeted
                  </div>
                  <div class="black-text-17">
                    & immunotherapy cancer medicines<span class='patient-color'>*</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="reg-info-item">
               <div class="support-low-cost-emi">
                <div class="support">
                    <div>
                        <img src="${url.resourcesPath}/img/personalizedSupport.svg" />
                    </div>
                    <div class="black-text-17">
                    Personalized support for all your needs
                    </div>
                
                </div>
                <div class="low-cost-emi">
                    <div class="emi-box">
                    <div>
                    <img src="${url.resourcesPath}/img/low-costEMI.svg" />
                    </div>
                    <div>
                        <div class="blue-text-18">Low-cost EMI</div>
                        <div class="blue-text-18">plans available</div>
                    </div>
                    </div>
                    <div class="black-text-17">
                    All services are completely free for patients
                    </div>
                </div>
              </div>
            </div>
            <div class="reg-info-item">
              <div class="contact-details">
                <div class="number">Call: 1800-5323-265</div>
                 <div class="vertical-line"></div>
                <div class="email">Email: info@mangocancercare.com</div>
              </div>
            </div>
          </div>
        <div id='main-content' class='reg-box-container'>  
        <div>
                <div id="kc-header-wrapper-flex">
                    <div id="kc-header-wrapper"
                        class="${properties.kcHeaderWrapperClass!}">${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}</div>
                </div>
            <div class="${properties.kcFormCardClass!}">
                <#--  <header class="${properties.kcFormHeaderClass!}">
                    <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                        <div class="${properties.kcLocaleMainClass!}" id="kc-locale">
                            <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                                <div id="kc-locale-dropdown" class="${properties.kcLocaleDropDownClass!}">
                                    <a href="#" id="kc-current-locale-link">${locale.current}</a>
                                    <ul class="${properties.kcLocaleListClass!}">
                                        <#list locale.supported as l>
                                            <li class="${properties.kcLocaleListItemClass!}">
                                                <a class="${properties.kcLocaleItemClass!}" href="${l.url}">${l.label}</a>
                                            </li>
                                        </#list>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </#if>
                <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
                    <#if displayRequiredFields>
                        <div class="${properties.kcContentWrapperClass!}">
                            <div class="${properties.kcLabelWrapperClass!} subtitle">
                                <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                            </div>
                            <div class="col-md-10">
                                <h1 id="kc-page-title"><#nested "header"></h1>
                            </div>
                        </div>
                    <#else>
                        <h1 id="kc-page-title"><#nested "header"></h1>
                    </#if>
                <#else>
                    <#if displayRequiredFields>
                        <div class="${properties.kcContentWrapperClass!}">
                            <div class="${properties.kcLabelWrapperClass!} subtitle">
                                <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                            </div>
                            <div class="col-md-10">
                                <#nested "show-username">
                                <div id="kc-username" class="${properties.kcFormGroupClass!}">
                                    <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                    <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                        <div class="kc-login-tooltip">
                                            <i class="${properties.kcResetFlowIcon!}"></i>
                                            <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    <#else>
                        <#nested "show-username">
                        <div id="kc-username" class="${properties.kcFormGroupClass!}">
                            <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                            <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                <div class="kc-login-tooltip">
                                    <i class="${properties.kcResetFlowIcon!}"></i>
                                    <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                </div>
                            </a>
                        </div>
                    </#if>
                </#if>
            </header>  -->
            <div id="kc-content">
                <div id="kc-content-wrapper">

                <#-- App-initiated actions should not see warning messages about the need to complete the action -->
                <#-- during login.                                                                               -->
                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                <div class="alert alert-${message.type}">
                    <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                    <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                    <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                    <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                    <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                </div>
            </#if>
                 <#if messagesPerField.existsError('username','password')>
                    <div class="alert alert-error">
                        <span class="pficon pficon-error-circle-o"></span>
                        <span class="kc-feedback-text">Invalid username or password.</span>
                    </div>
                </#if>

                <#nested "form">

                    <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent && auth.showBackButton()>
                        <form id="kc-select-back-form" action="${url.loginAction}" method="post" <#if displayWide>class="${properties.kcContentWrapperClass!}"</#if>>
                            <div <#if displayWide>class="${properties.kcFormSocialAccountContentClass!} ${properties.kcFormSocialAccountClass!}"</#if>>
                                <div class="${properties.kcFormGroupClass!}">
                                    <input class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                                        name="back" id="kc-back" type="submit" value="${msg("doBack")}"/>
                                </div>
                            </div>
                        </form>
                    </#if>

                <#if displayInfo>
                    <div id="kc-info" class="${properties.kcSignUpClass!}">
                        <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                            <#nested "info">
                        </div>
                    </div>
                </#if>
                </div>
            </div>

            </div>
           </div> 
        </div  >
    </div>
        <div id="kc-footer" class="${properties.kcFooterClass!}">
        <div id="kc-footer-wrapper" class="${properties.kcFooterWrapperClass!}">
            <div class="footer-links mb-lg-0 col-lg-5 col-12">
                <a
                href="https://mangocancercare.com/privacy-policy/"
                target="_blank"
                class="text-decoration-none fw-normal"
                >
                <span class="mr-20">Privacy Policy</span>
                
                
                </a>
                <span class="mr-20">|</span>
                    <a
                href="https://mangocancercare.com/terms-of-use/"
                target="_blank"
                class="text-decoration-none fw-normal"
                >
            <span>Terms of Use</span>
                </a>
            </div>
            <div class="mb-lg-0 col-lg-5 col-12">
                <Card.Link
                href="https://mangocancercare.com/terms-of-use/"
                target="_blank"
                class="text-decoration-none fw-normal"
                >
                <span>
                    Copyright © ${.now?string('yyyy')} Mango Sciences, Inc. All rights
                    reserved
                </span>
                </Card.Link>
            </div>
        </div>
        </div>
</div>
</body>
</html>
</#macro>
