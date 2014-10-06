var Q          = require('q'),
	config     = require('./config'),
    nodemailer = require('nodemailer');

// set up amazon SES transport for sending emails
var transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: config.aws.key,
    AWSSecretKey: config.aws.secret
});

exports.sendActivationEmail = function(user) {
	var deferred = Q.defer(),
		mailOptions = {
	        from: "Campuslively <jake@campuslively.com>",
	        to: user.email,
	        subject: "Activate your Account",
	        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">' +
  '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '<meta name="viewport" content="width=device-width" />' +
  '</head>' +
  '<body style="width: 100% !important; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0; padding: 0;"><style type="text/css">' +
'a:hover {text-decoration: underline;}' +
'a:focus {text-decoration: underline;}' +
'a:active {text-decoration: underline;}' +
'h1 a:active {text-decoration: underline;}' +
'h2 a:active {text-decoration: underline;}' +
'h3 a:active {text-decoration: underline;}' +
'h4 a:active {text-decoration: underline;}' +
'h5 a:active {text-decoration: underline;}' +
'h6 a:active {text-decoration: underline;}' +
'table.button:hover td {background: #2795b6 !important;}' +
'table.button:visited td {background: #2795b6 !important;}' +
'table.button:active td {background: #2795b6 !important;}' +
'table.button:hover td a {color: #fff !important;}' +
'table.button:visited td a {color: #fff !important;}' +
'table.button:active td a {color: #fff !important;}' +
'table.button:hover td {background: #2795b6 !important;}' +
'table.tiny-button:hover td {background: #2795b6 !important;}' +
'table.small-button:hover td {background: #2795b6 !important;}' +
'table.medium-button:hover td {background: #2795b6 !important;}' +
'table.large-button:hover td {background: #2795b6 !important;}' +
'table.button:hover td a {color: #ffffff !important;}' +
'table.button:active td a {color: #ffffff !important;}' +
'table.button td a:visited {color: #ffffff !important;}' +
'table.tiny-button:hover td a {color: #ffffff !important;}' +
'table.tiny-button:active td a {color: #ffffff !important;}' +
'table.tiny-button td a:visited {color: #ffffff !important;}' +
'table.small-button:hover td a {color: #ffffff !important;}' +
'table.small-button:active td a {color: #ffffff !important;}' +
'table.small-button td a:visited {color: #ffffff !important;}' +
'table.medium-button:hover td a {color: #ffffff !important;}' +
'table.medium-button:active td a {color: #ffffff !important;}' +
'table.medium-button td a:visited {color: #ffffff !important;}' +
'table.large-button:hover td a {color: #ffffff !important;}' +
'table.large-button:active td a {color: #ffffff !important;}' +
'table.large-button td a:visited {color: #ffffff !important;}' +
'table.secondary:hover td {background: #d0d0d0 !important; color: #555;}' +
'table.secondary:hover td a {color: #555 !important;}' +
'table.secondary td a:visited {color: #555 !important;}' +
'table.secondary:active td a {color: #555 !important;}' +
'table.success:hover td {background: #457a1a !important;}' +
'table.alert:hover td {background: #970b0e !important;}' +
'table.facebook:hover td {background: #2d4473 !important;}' +
'table.twitter:hover td {background: #0087bb !important;}' +
'table.green:hover td {background: #42b095 !important;}' +
'@media only screen and (max-width: 600px) {' +
  'table[class="body"] img {width: auto !important; height: auto !important;}' +
  'table[class="body"] center {min-width: 0 !important;}' +
  'table[class="body"] .container {width: 95% !important;}' +
  'table[class="body"] .row {width: 100% !important; display: block !important;}' +
  'table[class="body"] .wrapper {display: block !important; padding-right: 0 !important;}' +
  'table[class="body"] .columns {table-layout: fixed !important; float: none !important; width: 100% !important; padding-right: 0px !important; padding-left: 0px !important; display: block !important;}' +
  'table[class="body"] .column {table-layout: fixed !important; float: none !important; width: 100% !important; padding-right: 0px !important; padding-left: 0px !important; display: block !important;}' +
  'table[class="body"] .wrapper.first .columns {display: table !important;}' +
  'table[class="body"] .wrapper.first .column {display: table !important;}' +
  'table[class="body"] table.columns td {width: 100% !important;}' +
  'table[class="body"] table.column td {width: 100% !important;}' +
  'table[class="body"] .columns td.one {width: 8.333333% !important;}' +
  'table[class="body"] .column td.one {width: 8.333333% !important;}' +
  'table[class="body"] .columns td.two {width: 16.666666% !important;}' +
  'table[class="body"] .column td.two {width: 16.666666% !important;}' +
  'table[class="body"] .columns td.three {width: 25% !important;}' +
  'table[class="body"] .column td.three {width: 25% !important;}' +
  'table[class="body"] .columns td.four {width: 33.333333% !important;}' +
  'table[class="body"] .column td.four {width: 33.333333% !important;}' +
  'table[class="body"] .columns td.five {width: 41.666666% !important;}' +
  'table[class="body"] .column td.five {width: 41.666666% !important;}' +
  'table[class="body"] .columns td.six {width: 50% !important;}' +
  'table[class="body"] .column td.six {width: 50% !important;}' +
  'table[class="body"] .columns td.seven {width: 58.333333% !important;}' +
  'table[class="body"] .column td.seven {width: 58.333333% !important;}' +
  'table[class="body"] .columns td.eight {width: 66.666666% !important;}' +
  'table[class="body"] .column td.eight {width: 66.666666% !important;}' +
  'table[class="body"] .columns td.nine {width: 75% !important;}' +
  'table[class="body"] .column td.nine {width: 75% !important;}' +
  'table[class="body"] .columns td.ten {width: 83.333333% !important;}' +
  'table[class="body"] .column td.ten {width: 83.333333% !important;}' +
  'table[class="body"] .columns td.eleven {width: 91.666666% !important;}' +
  'table[class="body"] .column td.eleven {width: 91.666666% !important;}' +
  'table[class="body"] .columns td.twelve {width: 100% !important;}' +
  'table[class="body"] .column td.twelve {width: 100% !important;}' +
  'table[class="body"] td.offset-by-one {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-two {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-three {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-four {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-five {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-six {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-seven {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-eight {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-nine {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-ten {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-eleven {padding-left: 0 !important;}' +
  'table[class="body"] table.columns td.expander {width: 1px !important;}' +
  'table[class="body"] .right-text-pad {padding-left: 10px !important;}' +
  'table[class="body"] .text-pad-right {padding-left: 10px !important;}' +
  'table[class="body"] .left-text-pad {padding-right: 10px !important;}' +
  'table[class="body"] .text-pad-left {padding-right: 10px !important;}' +
  'table[class="body"] .hide-for-small {display: none !important;}' +
  'table[class="body"] .show-for-desktop {display: none !important;}' +
  'table[class="body"] .show-for-small {display: inherit !important;}' +
  'table[class="body"] .hide-for-desktop {display: inherit !important;}' +
  'table[class="body"] .right-text-pad {padding-left: 10px !important;}' +
  'table[class="body"] .left-text-pad {padding-right: 10px !important;}' +
'}' +
'</style>' +
  '<table class="body" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; height: 100%; width: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="center" align="center" valign="top" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;">' +
        '<center style="width: 100%; min-width: 580px;">' +
          '<table class="row header" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; background: #3e90be; padding: 0px;" bgcolor="#3e90be"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="center" align="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" valign="top">' +
                '<center style="width: 100%; min-width: 580px;">' +
                  '<table class="container" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                        '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="twelve sub-columns" style="text-align: center; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; min-width: 0px; width: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 10px 10px 0px;" align="center" valign="top">' +
                              '<img src="http://assets.campuslively.com/img/email_logo.png" style="max-width: 300px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto;" /></td>' +
                            '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                          '</tr></table></td>' +
                    '</tr></table></center>' +
              '</td>' +
            '</tr></table><table class="container" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top">' +
                '<table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                      '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" align="left" valign="top">' +
                            '<h1 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 40px; margin: 0; padding: 0;" align="left">Welcome to Campuslively!</h1>' +
                            '<p class="lead" style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 21px; font-size: 18px; margin: 0 0 10px; padding: 0;" align="left">You\'re almost ready to be in the loop around your campus</p>' +
                            '<p style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="left">If you\'re reading this email, that means your account has been successfully created. All you need to do now is click the big green \'Activate Your Account\' button below, and you\'ll be all set to log in and get started!</p>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><table class="medium-button green" style="margin-bottom: 20px; border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #4fbda2; margin: 0; padding: 0; border: 1px solid #42b095;" align="center" bgcolor="#4fbda2" valign="top">' +
                      '<a href="http://www.campuslively.com/activate/' + user._id + '/' + user.activationKey + '" target="_blank" style="color: #ffffff; font-weight: bold; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 20px; padding: 12px 0 10px;">Activate Your Account</a>' +
                    '</td>' +
                  '</tr></table><table class="row footer" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; background: #ebebeb; margin: 0; padding: 10px 20px 0px 0px;" align="left" bgcolor="#ebebeb" valign="top">' +
                      '<table class="six columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 280px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="left-text-pad" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px 10px;" align="left" valign="top">' +
                            '<h5 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 24px; margin: 0; padding: 0 0 10px;" align="left">Connect With Us:</h5>' +
                            '<table class="tiny-button facebook" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #3b5998; margin: 0; padding: 0; border: 1px solid #2d4473;" align="center" bgcolor="#3b5998" valign="top">' +
                                  '<a href="http://www.facebook.com/campuslively" target="_blank" style="color: #ffffff; font-weight: normal; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 12px; padding: 5px 0 4px;">Facebook</a>' +
                                '</td>' +
                              '</tr></table><br /><table class="tiny-button twitter" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #00acee; margin: 0; padding: 0; border: 1px solid #0087bb;" align="center" bgcolor="#00acee" valign="top">' +
                                  '<a href="http://www.twitter.com/campuslively" target="_blank" style="color: #ffffff; font-weight: normal; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 12px; padding: 5px 0 4px;">Twitter</a>' +
                                '</td>' +
                              '</tr></table></td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                    '<td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; background: #ebebeb; margin: 0; padding: 10px 0px 0px;" align="left" bgcolor="#ebebeb" valign="top">' +
                      '<table class="six columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 280px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="last right-text-pad" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" align="left" valign="top">' +
                            '<h5 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 24px; margin: 0; padding: 0 0 10px;" align="left">Contact Us:</h5>' +
                            '<p style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="left">' +
                              '<a href="mailto:jake@campuslively.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">jake@campuslively.com</a>' +
                              '<br /><a href="mailto:matt@campuslively.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">matt@campuslively.com</a>' +
                            '</p>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                      '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td align="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" valign="top">' +
                            '<center style="width: 100%; min-width: 580px;">' +
                              '<p style="text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="center"><a href="http://www.campuslively.com/privacy" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">Privacy Policy</a></p>' +
                            '</center>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><!-- container end below --></td>' +
            '</tr></table></center>' +
      '</td>' +
    '</tr></table></body>' +
'</html>'
	    };

    transport.sendMail(mailOptions, function(error, response){
        if(error){
            deferred.reject(error);
        } else {
            deferred.resolve(response.message);
        }

        transport.close();
    });

    return deferred.promise;
};

exports.sendResetEmail = function(user) {
	var deferred = Q.defer(),
		mailOptions = {
	        from: "Campuslively <jake@campuslively.com>",
	        to: user.email,
	        subject: "Reset your Password",
	        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">' +
  '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '<meta name="viewport" content="width=device-width" />' +
  '</head>' +
  '<body style="width: 100% !important; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0; padding: 0;"><style type="text/css">' +
'a:hover {text-decoration: underline;}' +
'a:focus {text-decoration: underline;}' +
'a:active {text-decoration: underline;}' +
'h1 a:active {text-decoration: underline;}' +
'h2 a:active {text-decoration: underline;}' +
'h3 a:active {text-decoration: underline;}' +
'h4 a:active {text-decoration: underline;}' +
'h5 a:active {text-decoration: underline;}' +
'h6 a:active {text-decoration: underline;}' +
'table.button:hover td {background: #2795b6 !important;}' +
'table.button:visited td {background: #2795b6 !important;}' +
'table.button:active td {background: #2795b6 !important;}' +
'table.button:hover td a {color: #fff !important;}' +
'table.button:visited td a {color: #fff !important;}' +
'table.button:active td a {color: #fff !important;}' +
'table.button:hover td {background: #2795b6 !important;}' +
'table.tiny-button:hover td {background: #2795b6 !important;}' +
'table.small-button:hover td {background: #2795b6 !important;}' +
'table.medium-button:hover td {background: #2795b6 !important;}' +
'table.large-button:hover td {background: #2795b6 !important;}' +
'table.button:hover td a {color: #ffffff !important;}' +
'table.button:active td a {color: #ffffff !important;}' +
'table.button td a:visited {color: #ffffff !important;}' +
'table.tiny-button:hover td a {color: #ffffff !important;}' +
'table.tiny-button:active td a {color: #ffffff !important;}' +
'table.tiny-button td a:visited {color: #ffffff !important;}' +
'table.small-button:hover td a {color: #ffffff !important;}' +
'table.small-button:active td a {color: #ffffff !important;}' +
'table.small-button td a:visited {color: #ffffff !important;}' +
'table.medium-button:hover td a {color: #ffffff !important;}' +
'table.medium-button:active td a {color: #ffffff !important;}' +
'table.medium-button td a:visited {color: #ffffff !important;}' +
'table.large-button:hover td a {color: #ffffff !important;}' +
'table.large-button:active td a {color: #ffffff !important;}' +
'table.large-button td a:visited {color: #ffffff !important;}' +
'table.secondary:hover td {background: #d0d0d0 !important; color: #555;}' +
'table.secondary:hover td a {color: #555 !important;}' +
'table.secondary td a:visited {color: #555 !important;}' +
'table.secondary:active td a {color: #555 !important;}' +
'table.success:hover td {background: #457a1a !important;}' +
'table.alert:hover td {background: #970b0e !important;}' +
'table.facebook:hover td {background: #2d4473 !important;}' +
'table.twitter:hover td {background: #0087bb !important;}' +
'table.green:hover td {background: #42b095 !important;}' +
'@media only screen and (max-width: 600px) {' +
  'table[class="body"] img {width: auto !important; height: auto !important;}' +
  'table[class="body"] center {min-width: 0 !important;}' +
  'table[class="body"] .container {width: 95% !important;}' +
  'table[class="body"] .row {width: 100% !important; display: block !important;}' +
  'table[class="body"] .wrapper {display: block !important; padding-right: 0 !important;}' +
  'table[class="body"] .columns {table-layout: fixed !important; float: none !important; width: 100% !important; padding-right: 0px !important; padding-left: 0px !important; display: block !important;}' +
  'table[class="body"] .column {table-layout: fixed !important; float: none !important; width: 100% !important; padding-right: 0px !important; padding-left: 0px !important; display: block !important;}' +
  'table[class="body"] .wrapper.first .columns {display: table !important;}' +
  'table[class="body"] .wrapper.first .column {display: table !important;}' +
  'table[class="body"] table.columns td {width: 100% !important;}' +
  'table[class="body"] table.column td {width: 100% !important;}' +
  'table[class="body"] .columns td.one {width: 8.333333% !important;}' +
  'table[class="body"] .column td.one {width: 8.333333% !important;}' +
  'table[class="body"] .columns td.two {width: 16.666666% !important;}' +
  'table[class="body"] .column td.two {width: 16.666666% !important;}' +
  'table[class="body"] .columns td.three {width: 25% !important;}' +
  'table[class="body"] .column td.three {width: 25% !important;}' +
  'table[class="body"] .columns td.four {width: 33.333333% !important;}' +
  'table[class="body"] .column td.four {width: 33.333333% !important;}' +
  'table[class="body"] .columns td.five {width: 41.666666% !important;}' +
  'table[class="body"] .column td.five {width: 41.666666% !important;}' +
  'table[class="body"] .columns td.six {width: 50% !important;}' +
  'table[class="body"] .column td.six {width: 50% !important;}' +
  'table[class="body"] .columns td.seven {width: 58.333333% !important;}' +
  'table[class="body"] .column td.seven {width: 58.333333% !important;}' +
  'table[class="body"] .columns td.eight {width: 66.666666% !important;}' +
  'table[class="body"] .column td.eight {width: 66.666666% !important;}' +
  'table[class="body"] .columns td.nine {width: 75% !important;}' +
  'table[class="body"] .column td.nine {width: 75% !important;}' +
  'table[class="body"] .columns td.ten {width: 83.333333% !important;}' +
  'table[class="body"] .column td.ten {width: 83.333333% !important;}' +
  'table[class="body"] .columns td.eleven {width: 91.666666% !important;}' +
  'table[class="body"] .column td.eleven {width: 91.666666% !important;}' +
  'table[class="body"] .columns td.twelve {width: 100% !important;}' +
  'table[class="body"] .column td.twelve {width: 100% !important;}' +
  'table[class="body"] td.offset-by-one {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-two {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-three {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-four {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-five {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-six {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-seven {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-eight {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-nine {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-ten {padding-left: 0 !important;}' +
  'table[class="body"] td.offset-by-eleven {padding-left: 0 !important;}' +
  'table[class="body"] table.columns td.expander {width: 1px !important;}' +
  'table[class="body"] .right-text-pad {padding-left: 10px !important;}' +
  'table[class="body"] .text-pad-right {padding-left: 10px !important;}' +
  'table[class="body"] .left-text-pad {padding-right: 10px !important;}' +
  'table[class="body"] .text-pad-left {padding-right: 10px !important;}' +
  'table[class="body"] .hide-for-small {display: none !important;}' +
  'table[class="body"] .show-for-desktop {display: none !important;}' +
  'table[class="body"] .show-for-small {display: inherit !important;}' +
  'table[class="body"] .hide-for-desktop {display: inherit !important;}' +
  'table[class="body"] .right-text-pad {padding-left: 10px !important;}' +
  'table[class="body"] .left-text-pad {padding-right: 10px !important;}' +
'}' +
'</style>' +
  '<table class="body" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; height: 100%; width: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="center" align="center" valign="top" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;">' +
        '<center style="width: 100%; min-width: 580px;">' +
          '<table class="row header" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; background: #3e90be; padding: 0px;" bgcolor="#3e90be"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="center" align="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" valign="top">' +
                '<center style="width: 100%; min-width: 580px;">' +
                  '<table class="container" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                        '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="twelve sub-columns" style="text-align: center; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; min-width: 0px; width: 100%; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 10px 10px 0px;" align="center" valign="top">' +
                              '<img src="http://assets.campuslively.com/img/email_logo.png" style="max-width: 300px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width: auto;" /></td>' +
                            '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                          '</tr></table></td>' +
                    '</tr></table></center>' +
              '</td>' +
            '</tr></table><table class="container" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top">' +
                '<table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                      '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" align="left" valign="top">' +
                            '<h1 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 40px; margin: 0; padding: 0;" align="left">Forget Your Password?</h1>' +
                            '<p style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="left">If you\'ve forgotten your password to Campuslively, all you need to do is click the big green \'Reset Your Password\' button below. This will allow you to choose a new password for your account which you will then be able to log in with.</p>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><table class="medium-button green" style="margin-bottom: 20px; border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #4fbda2; margin: 0; padding: 0; border: 1px solid #42b095;" align="center" bgcolor="#4fbda2" valign="top">' +
                      '<a href="http://www.campuslively.com/reset/' + user._id + '/' + user.passwordResetKey + '" target="_blank" style="color: #ffffff; font-weight: bold; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 20px; padding: 12px 0 10px;">Reset Your Password</a>' +
                    '</td>' +
                  '</tr></table><table class="row footer" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; background: #ebebeb; margin: 0; padding: 10px 20px 0px 0px;" align="left" bgcolor="#ebebeb" valign="top">' +
                      '<table class="six columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 280px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="left-text-pad" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px 10px;" align="left" valign="top">' +
                            '<h5 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 24px; margin: 0; padding: 0 0 10px;" align="left">Connect With Us:</h5>' +
                            '<table class="tiny-button facebook" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #3b5998; margin: 0; padding: 0; border: 1px solid #2d4473;" align="center" bgcolor="#3b5998" valign="top">' +
                                  '<a href="http://www.facebook.com/campuslively" target="_blank" style="color: #ffffff; font-weight: normal; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 12px; padding: 5px 0 4px;">Facebook</a>' +
                                '</td>' +
                              '</tr></table><br /><table class="tiny-button twitter" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; display: block; width: auto !important; background: #00acee; margin: 0; padding: 0; border: 1px solid #0087bb;" align="center" bgcolor="#00acee" valign="top">' +
                                  '<a href="http://www.twitter.com/campuslively" target="_blank" style="color: #ffffff; font-weight: normal; text-decoration: none; display: block; font-family: Helvetica, Arial, sans-serif; font-size: 12px; padding: 5px 0 4px;">Twitter</a>' +
                                '</td>' +
                              '</tr></table></td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                    '<td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; background: #ebebeb; margin: 0; padding: 10px 0px 0px;" align="left" bgcolor="#ebebeb" valign="top">' +
                      '<table class="six columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 280px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="last right-text-pad" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" align="left" valign="top">' +
                            '<h5 style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 1.3; word-break: normal; font-size: 24px; margin: 0; padding: 0 0 10px;" align="left">Contact Us:</h5>' +
                            '<p style="color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="left">' +
                              '<a href="mailto:jake@campuslively.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">jake@campuslively.com</a>' +
                              '<br /><a href="mailto:matt@campuslively.com" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">matt@campuslively.com</a>' +
                            '</p>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><table class="row" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 100%; position: relative; display: block; padding: 0px;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td class="wrapper last" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; position: relative; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 10px 0px 0px;" align="left" valign="top">' +
                      '<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 580px; margin: 0 auto; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td align="center" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0px 0px 10px;" valign="top">' +
                            '<center style="width: 100%; min-width: 580px;">' +
                              '<p style="text-align: center; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 0;" align="center"><a href="http://www.campuslively.com/privacy" target="_blank" style="color: #000; font-weight: bold; text-decoration: none;">Privacy Policy</a></p>' +
                            '</center>' +
                          '</td>' +
                          '<td class="expander" style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: left; visibility: hidden; width: 0px; color: #222222; font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: 300; line-height: 19px; font-size: 14px; margin: 0; padding: 0;" align="left" valign="top"></td>' +
                        '</tr></table></td>' +
                  '</tr></table><!-- container end below --></td>' +
            '</tr></table></center>' +
      '</td>' +
    '</tr></table></body>' +
'</html>'
	    };

    transport.sendMail(mailOptions, function(error, response){
        if(error){
            deferred.reject(error);
        } else {
            deferred.resolve(response.message);
        }

        transport.close();
    });

    return deferred.promise;
};

exports.sendContactEmail = function(req, res) {
    var sendEmail = function(message) {
        var deferred = Q.defer(),
            mailOptions = {
                from: "Campuslively <jake@campuslively.com>",
                to: "jakemmarsh@gmail.com, msliwk@yahoo.com",
                html: '<strong>Message:</strong> ' + message.body + '<br /><br />'
                      + '<strong>Reply Email:</strong> ' + message.replyAddress
            };

        if(message.subject) {
            mailOptions.subject = "Message from Campuslively, Subject: " + message.subject;
        }
        else {
            mailOptions.subject = "Message from Campuslively";
        }

        transport.sendMail(mailOptions, function(error, response){
            if(error){
                deferred.reject(error);
            } else {
                deferred.resolve(response.message);
            }

            transport.close();
        });

        return deferred.promise;
    }

    sendEmail(req.body).then(function(data) {
        res.send(200, "Message successfully sent.");
    }, function(err) {
        res.send(500, "Failed to send email.");
    });
};