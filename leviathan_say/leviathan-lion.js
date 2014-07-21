'use strict';

/*
 * @author levbrie
 * taken directly from https://github.com/yeoman/yosay
 */

var chalk = require('chalk');
var pad = require('pad-component');
var wrap = require('word-wrap');
var stringLength = require('string-length');
var stripAnsi = require('strip-ansi');
var ansiStyles = require('ansi-styles');
var ansiRegex = require('ansi-regex')();

var topOffset = 3;
var leftOffset = 17;

var defaultGreeting =
  '\n     _-----_' +
  '\n    |       |    ' +
  '\n    |' + chalk.red('--(o)--') + '|    ' +
  '\n   `---------´   ' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '    ' +
  '\n    /___A___\\    ' +
  '\n     ' + chalk.yellow('|  ~  |') + '     ' +
  '\n   __' + chalk.yellow('\'.___.\'') + '__   ' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' ` ';



// ' + chalk.red('
// ') + ';
var coloredLion =
  '\n            ' + chalk.yellow(',aodObo,') + '' +
  '\n         ' + chalk.yellow(',AMMMMP~~~~') + '' + '      ' +
  '\n      ' + chalk.yellow(',MMMMMMMMA.') + '' + '         ' +
  '\n    ' + chalk.yellow(',M;\'     `YV\'') + '' + '         ' +
  '\n   ' + chalk.yellow('AM\' ,OMA,') + '' + '              ' +
  '\n  ' + chalk.yellow('AM|   `~VMM,.') + '      .,ama,____,amma,..' +
  '\n  ' + chalk.yellow('MML      )MMMD') + '   .AMMMMMMMMMMMMMMMMMMD.' +
  '\n  ' + chalk.yellow('VMMM    .AMMY\'') + '  ' + chalk.gray(',AMMMMMMMMMMMMMMMMMMMMD') + '' +
  '\n  ' + chalk.yellow('`VMM, AMMMV\'') + '  ' + chalk.gray(',AMMMMMMMMMMMMMMMMMMMMMMM,') + '                ' + chalk.yellow(',') +
  '\n   ' + chalk.yellow('VMMMmMMV\'') + '  ' + chalk.gray(',AMY~~\'\'  \'MMMMMMMMMMMM\' \'~~') + '             ' + chalk.yellow(',aMM') +
  '\n   ' + chalk.yellow('`YMMMM\'') + '   ' + chalk.gray('AMM\'        `VMMMMMMMMP\'_') + '              ' + chalk.yellow('A,aMMMM') +
  '\n    ' + chalk.yellow('AMMM\'') + '    ' + chalk.gray('VMMA. YVmmmMMMMMMMMMMML MmmmY') + '          ' + chalk.yellow('MMMMMMM') +
  '\n   ' + chalk.yellow(',AMMA') + '   _,HMMMMmdMMMMMMMMMMMMMMMML`VMV\'         ' + chalk.yellow(',MMMMMMM') +
  '\n   ' + chalk.yellow('AMMMA') + ' _\'MMMMMMMMMMMMMMMMMMMMMMMMMMA `\'          ' + chalk.yellow('MMMMMMMM') +
  '\n  ' + chalk.yellow(',AMMMMMMMMM') + 'MMMMMMMMMMMMMMMMMMMMMMMMMa      ,,,   ' + chalk.yellow('`MMMMMMM') +
  '\n  ' + chalk.yellow('AMMMMMMMMM\'') + '~`YMMMMMMMMMMMMMMMMMMMMMMA    ,AMMV    ' + chalk.yellow('MMMMMMM') +
  '\n  ' + chalk.yellow('VMV MMMMMV') + '   `YMMMMMMMMMMMMMMMMMMMMMY   `VMMY\'  ' + chalk.yellow('adMMMMMMM') +
  '\n  ' + chalk.yellow('`V  MMMM\'') + '      `YMMMMMMMV.~~~~~~~~~,aado,`V\'\'   ' + chalk.yellow('MMMMMMMMM') +
  '\n    ' + chalk.yellow(' aMMMMmv') + '       `YMMMMMMMm,    ,/AMMMMMA,      ' + chalk.yellow('YMMMMMMMM') +
  '\n     ' + chalk.yellow('VMMMMM,,v') + '       YMMMMMMMMMo oMMMMMMMMM\'    ' + chalk.yellow('a, YMMMMMMM') +
  '\n     ' + chalk.yellow('`YMMMMMY\'') + '       `YMMMMMMMY\' `YMMMMMMMY     ' + chalk.yellow('MMmMMMMMMMM') +
  '\n     ' + chalk.yellow(' AMMMMM  ,') + '        ~~~~~,aooooa,~~~~~~      ' + chalk.yellow('MMMMMMMMMMM') +
  '\n        ' + chalk.yellow('YMMMb,d\' ') + '        dMMMMMMMMMMMMMD,   ' + chalk.yellow('a,, AMMMMMMMMMM') +
  '\n         ' + chalk.yellow('YMMMMM, A') + '       YMMMMMMMMMMMMMY   ' + chalk.yellow(',MMMMMMMMMMMMMMM') +
  '\n        ' + chalk.yellow('AMMMMMMMMM ') + '       `~~~~\'  `~~~~\'   ' + chalk.yellow('AMMMMMMMMMMMMMMM') +
  '\n        ' + chalk.yellow('`VMMMMMM\'') + '  ,A,                  ' + chalk.yellow(',,AMMMMMMMMMMMMMMMM') +
  '\n      ' + chalk.yellow(',AMMMMMMMMMMMMMMA,       ,aAMMMMMMMMMMMMMMMMMMMMMMMMM') + '' +
  '\n    ' + chalk.yellow(',AMMMMMMMMMMMMMMMMMMA,    AMMMMMMMMMMMMMMMMMMMMMMMMMMMM') + '' +
  '\n  ' + chalk.yellow(',AMMMMMMMMMMMMMMMMMMMMMA   AMMMMMMMMMMMMMMMMMMMMMMMMMMMMM') + '';

var coloredLion2 =
  '\n            ,aodObo,' +
  '\n         ,AMMMMP~~~~' + '      ' +
  '\n      ,MMMMMMMMA.' + '         ' +
  '\n    ,M;\'     `YV\'' + '         ' +
  '\n   AM\' ,OMA,' + '              ' +
  '\n  AM|   `~VMM,.      .,ama,____,amma,..' +
  '\n  MML      )MMMD   .AMMMMMMMMMMMMMMMMMMD.' +
  '\n  VMMM    .AMMY\'  ' + chalk.red(',AMMMMMMMMMMMMMMMMMMMMD') + '' +
  '\n  `VMM, AMMMV\'  ' + chalk.red(',AMMMMMMMMMMMMMMMMMMMMMMM,') + '                ,' +
  '\n   VMMMmMMV\'  ' + chalk.red(',AMY~~\'\'  \'MMMMMMMMMMMM\' \'~~') + '             ,aMM' +
  '\n   `YMMMM\'   ' + chalk.red('AMM\'        `VMMMMMMMMP\'_') + '              A,aMMMM' +
  '\n    AMMM\'    ' + chalk.red('VMMA. YVmmmMMMMMMMMMMML MmmmY') + '          MMMMMMM' +
  '\n   ,AMMA   _,HMMMMmdMMMMMMMMMMMMMMMML`VMV\'         ,MMMMMMM' +
  '\n   AMMMA _\'MMMMMMMMMMMMMMMMMMMMMMMMMMA `\'          MMMMMMMM' +
  '\n  ,AMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMa      ,,,   `MMMMMMM' +
  '\n  AMMMMMMMMM\'~`YMMMMMMMMMMMMMMMMMMMMMMA    ,AMMV    MMMMMMM' +
  '\n  VMV MMMMMV   `YMMMMMMMMMMMMMMMMMMMMMY   `VMMY\'  adMMMMMMM' +
  '\n  `V  MMMM\'      `YMMMMMMMV.~~~~~~~~~,aado,`V\'\'   MMMMMMMMM' +
  '\n     aMMMMmv       `YMMMMMMMm,    ,/AMMMMMA,      YMMMMMMMM' +
  '\n     VMMMMM,,v       YMMMMMMMMMo oMMMMMMMMM\'    a, YMMMMMMM' +
  '\n     `YMMMMMY\'       `YMMMMMMMY\' `YMMMMMMMY     MMmMMMMMMMM' +
  '\n      AMMMMM  ,        ~~~~~,aooooa,~~~~~~      MMMMMMMMMMM' +
  '\n        YMMMb,d\'         dMMMMMMMMMMMMMD,   a,, AMMMMMMMMMM' +
  '\n         YMMMMM, A       YMMMMMMMMMMMMMY   ,MMMMMMMMMMMMMMM' +
  '\n        AMMMMMMMMM        `~~~~\'  `~~~~\'   AMMMMMMMMMMMMMMM' +
  '\n        `VMMMMMM\'  ,A,                  ,,AMMMMMMMMMMMMMMMM' +
  '\n      ,AMMMMMMMMMMMMMMA,       ,aAMMMMMMMMMMMMMMMMMMMMMMMMM' +
  '\n    ,AMMMMMMMMMMMMMMMMMMA,    AMMMMMMMMMMMMMMMMMMMMMMMMMMMM' +
  '\n  ,AMMMMMMMMMMMMMMMMMMMMMA   AMMMMMMMMMMMMMMMMMMMMMMMMMMMMM';

// var lion =
//   '\n            ,aodObo,' +
//   '\n         ,AMMMMP~~~~' +
//   '\n      ,MMMMMMMMA.' +
//   '\n    ,M;\'     `YV\'' +
//   '\n   AM\' ,OMA,' +
//   '\n  AM|   `~VMM,.      .,ama,____,amma,..' +
//   '\n  MML      )MMMD   .AMMMMMMMMMMMMMMMMMMD.' +
//   '\n  VMMM    .AMMY\'  ,AMMMMMMMMMMMMMMMMMMMMD' +
//   '\n  `VMM, AMMMV\'  ,AMMMMMMMMMMMMMMMMMMMMMMM,                ,' +
//   '\n   VMMMmMMV\'  ,AMY~~\'\'  \'MMMMMMMMMMMM\' \'~~             ,aMM' +
//   '\n   `YMMMM\'   AMM\'        `VMMMMMMMMP\'_              A,aMMMM' +
//   '\n    AMMM\'    VMMA. YVmmmMMMMMMMMMMML MmmmY          MMMMMMM' +
//   '\n   ,AMMA   _,HMMMMmdMMMMMMMMMMMMMMMML`VMV\'         ,MMMMMMM' +
//   '\n   AMMMA _\'MMMMMMMMMMMMMMMMMMMMMMMMMMA `\'          MMMMMMMM' +
//   '\n  ,AMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMa      ,,,   `MMMMMMM' +
//   '\n  AMMMMMMMMM\'~`YMMMMMMMMMMMMMMMMMMMMMMA    ,AMMV    MMMMMMM' +
//   '\n  VMV MMMMMV   `YMMMMMMMMMMMMMMMMMMMMMY   `VMMY\'  adMMMMMMM' +
//   '\n  `V  MMMM\'      `YMMMMMMMV.~~~~~~~~~,aado,`V\'\'   MMMMMMMMM' +
//   '\n     aMMMMmv       `YMMMMMMMm,    ,/AMMMMMA,      YMMMMMMMM' +
//   '\n     VMMMMM,,v       YMMMMMMMMMo oMMMMMMMMM\'    a, YMMMMMMM' +
//   '\n     `YMMMMMY\'       `YMMMMMMMY\' `YMMMMMMMY     MMmMMMMMMMM' +
//   '\n      AMMMMM  ,        ~~~~~,aooooa,~~~~~~      MMMMMMMMMMM' +
//   '\n        YMMMb,d\'         dMMMMMMMMMMMMMD,   a,, AMMMMMMMMMM' +
//   '\n         YMMMMM, A       YMMMMMMMMMMMMMY   ,MMMMMMMMMMMMMMM' +
//   '\n        AMMMMMMMMM        `~~~~\'  `~~~~\'   AMMMMMMMMMMMMMMM' +
//   '\n        `VMMMMMM\'  ,A,                  ,,AMMMMMMMMMMMMMMMM' +
//   '\n      ,AMMMMMMMMMMMMMMA,       ,aAMMMMMMMMMMMMMMMMMMMMMMMMM' +
//   '\n    ,AMMMMMMMMMMMMMMMMMMA,    AMMMMMMMMMMMMMMMMMMMMMMMMMMMM' +
//   '\n  ,AMMMMMMMMMMMMMMMMMMMMMA   AMMMMMMMMMMMMMMMMMMMMMMMMMMMMM';

// var superText =
//   '\n ______               _____         _____ ______' +
//   '\n ___  / _____ ___   _____(_)______ ___  /____  /_ ______ ________' +
//   '\n __  /  _  _ \__ | / /__  / _  __ `/_  __/__  __ \_  __ `/__  __ \' +
//   '\n _  /___/  __/__ |/ / _  /  / /_/ / / /_  _  / / // /_/ / _  / / /' +
//   '\n /_____/\___/ _____/  /_/   \__,_/  \__/  /_/ /_/ \__,_/  /_/ /_/' +
//   '\n ' +
//   '\n                              ______' +
//   '\n                              ___/ /_' +
//   '\n                              /_  __/' +
//   '\n                               /_/' +
//   '\n __  __' +
//   '\n _ \/ /_____ ______ _______ ___ ______ ________' +
//   '\n __  / _  _ \_  __ \__  __ `__ \_  __ `/__  __ \\' +
//   '\n _  /  /  __// /_/ /_  / / / / // /_/ / _  / / /' +
//   '\n /_/   \___/ \____/ /_/ /_/ /_/ \__,_/  /_/ /_/';

var leviathanTechText =
  '\n 8                 w       w   8                  88888            8' +
  '\n 8    .d88b Yb  dP w .d88 w8ww 8d8b. .d88 8d8b.     8   .d88b .d8b 8d8b.' +
  '\n 8    8.dP\'  YbdP  8 8  8  8   8P Y8 8  8 8P Y8     8   8.dP\' 8    8P Y8' +
  '\n 8888 `Y88P   YP   8 `Y88  Y8P 8   8 `Y88 8   8     8   `Y88P `Y8P 8   8';

module.exports = function (message, options) {
  message = (message || 'Welcome to Yeoman, ladies and gentlemen!').trim();
  options = options || {};

  /*
   * What you're about to see may confuse you. And rightfully so. Here's an
   * explanation.
   *
   * When yosay is given a string, we create a duplicate with the ansi styling
   * sucked out. This way, the true length of the string is read by `pad` and
   * `wrap`, so they can correctly do their job without getting tripped up by
   * the "invisible" ansi. Along with the duplicated, non-ansi string, we store
   * the character position of where the ansi was, so that when we go back over
   * each line that will be printed out in the message box, we check the
   * character position to see if it needs any styling, then re-insert it if
   * necessary.
   *
   * Better implementations welcome :)
   */

  var maxLength = 24;
  var frame;
  var unstyledMessage;
  var styledIndexes = {};
  var completedString = '';
  var regExNewLine;

  if (options.maxLength) {
    maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length;

    if (maxLength < options.maxLength) {
      maxLength = options.maxLength;
    }
  }

  regExNewLine = new RegExp('\\s{' + maxLength + '}');

  frame = {
    top: '.' + pad('', maxLength + 2, '-') + '.',
    side: ansiStyles.reset.open + '|' + ansiStyles.reset.open,
    bottom: ansiStyles.reset.open + '\'' + pad('', maxLength + 2, '-') + '\''
  };

  message.replace(ansiRegex, function (match, offset) {
    Object.keys(styledIndexes).forEach(function (key) {
      offset -= styledIndexes[key].length;
    });

    styledIndexes[offset] = styledIndexes[offset] ? styledIndexes[offset] + match : match;
  });

  return wrap(stripAnsi(message), { width: maxLength })
    .split(/\n/)
    .reduce(function (greeting, str, index, array) {
      var paddedString;

      if (!regExNewLine.test(str)) {
        str = str.trim();
      }

      completedString += str;

      str = completedString
        .substr(completedString.length - str.length)
        .replace(/./g, function (char, charIndex) {
          if (index > 0) {
            charIndex += completedString.length - str.length + index;
          }

          var hasContinuedStyle = 0;
          var continuedStyle;

          Object.keys(styledIndexes).forEach(function (offset) {
            if (charIndex > offset) {
              hasContinuedStyle++;
              continuedStyle = styledIndexes[offset];
            }

            if (hasContinuedStyle === 1 && charIndex < offset) {
              hasContinuedStyle++;
            }
          });

          if (styledIndexes[charIndex]) {
            return styledIndexes[charIndex] + char;
          } else if (hasContinuedStyle >= 2) {
            return continuedStyle + char;
          } else {
            return char;
          }
        })
        .trim();

      paddedString = pad({
        length: stringLength(str),
        valueOf: function () {
          return ansiStyles.reset.open + str + ansiStyles.reset.open;
        }
      }, maxLength);

      if (index === 0) {
        greeting[topOffset - 1] += frame.top;
      }

      greeting[index + topOffset] =
        (greeting[index + topOffset] || pad.left('', leftOffset)) +
        frame.side + ' ' + paddedString + ' ' + frame.side;

      if (!array[index + 1]) {
        greeting[index + topOffset + 1] =
          (greeting[index + topOffset + 1] || pad.left('', leftOffset)) +
          frame.bottom;
      }

      return greeting;
    }, coloredLion.split(/\n/))
    .join('\n') + '\n';
};
