// import {Hashtable, jsNode} from './module.js';
var fs = require('fs');
var helper = require('./module.js');
var path = require("path");

const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"

module.exports.Checker = class {
    ESCAPE_CHAR = [".",
    ",",
    "!",
    ";",
    ":",
    "?",
    "%",
    "~",
    "+",
    "=",
    "-",
    "_",
    "*",
    "@",
    "#",
    "&",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    ]
    /**
     * Available languages are:
     * 
     * english
     * 
     * german
     * 
     * french
     * 
     * spanish
     * 
     * italian
     * 
     * Please choose one of them and type in exactly what's shown above!
     * @param {Number} size The size of the hash table
     * @param {String} language The language of the text
     * @param {String} text The actual text
     */
    constructor(size, language, text) {
        this.ht = new helper.Hashtable;
        this.language = language;
        this.text = text;
        this.words_inDict = 0;
        this.size = size;
    }

    /**
     * checks if the given language is supported
     * @param {String} lang 
     */
    check_lang(lang){
        const SUPPORTED_LANGS = [
            "english",
            "german",
            "french",
            "spanish",
            "italian"
        ]
        
        if (!(SUPPORTED_LANGS.includes(lang.toLowerCase()))) {
            console.log(`${FgRed}Invalid language!${Reset}`);
            return false;
        }
        return true;
    }  

    /**
     * Not something you are going to use!
     * 
     * Removes any non-alphabet chars
     */
    clean() {
        const start_time = Date.now();
        if (!(this.check_lang(this.language))) {
            return false;
        }
        if (this.text === null){
            return false;
        }
        var buffer = this.text;
        for (var i = 0; i < buffer.length; i++) {
            if (buffer.charAt(i) in this.ESCAPE_CHAR) {
                this.text.replace(buffer.charAt(i), '');
            }
        }
        const end_time = Date.now();
        const final_time = end_time - start_time;
        return final_time;
    }

    /**
     * Not something you are going to use!
     * 
     * Returns load time if success
     * @returns 
     */
    bucketize() {
        if (!(this.check_lang(this.language))) {
            return false;
        }
        this.clean();
        var ht = new helper.Hashtable(this.size);

        const referenceFileURL = `https://raw.githubusercontent.com/WORK90873/words/main/${this.language}.txt`;
        
        const filename = path.join(__dirname, '/data', `/${this.language}.txt`);
        console.log(filename);
        var ll;
        const start_time = Date.now();
        var lines;
        
        var text = fs.readFileSync(filename, "utf-8");
        var lines = text.split("\n");

        this.words_inDict = lines.length;

        for (var l = 0; l < lines.length; l++) {
            ht.insert(new helper.jsNode(lines[l]));
        }

        const end_time = Date.now();
        const final_time = end_time - start_time;

        this.ht = ht;
        return final_time

    }

    /**
     * 
     * @param {JSON} statistics 
     * @returns 
     */
    visualize(statistics) {
        // """
        // Don't call this method! It would be called for you at some point!
        // """
        // Item
        // if not self.check_lang(self.language):
        //     cprint("Invalid language!", "red")
        //     return
        // if not statistics["token"] or statistics["token"] != "47874587235697124309":
        //     cprint("Don't call this method! It would be called for you at some point!", "yellow")
        //     return

        // total = statistics["total_words"]
        // wrong_num = statistics["misspelled_num"]
        // dict_num = statistics["words_in_dictionary"]
        // wrong = statistics["misspelled_words"]
        // rt = statistics["runtime"]
        // lt = statistics["load_time"]
        // ct = statistics["clean_time"]
        // res = f"Total words: {total}\nNumber of misspelled words: {wrong_num}\nNumber of words in dictionary: {dict_num}\nMisspelled words: {wrong}\nTime statistics:\nTime used to load dictionary: {lt}\nTime used to remove non-alphabetic characters: {ct}\nLookup time(s): {rt}"
        // console.log(res, "green");
        // return res
    }

    /**
     * Checks the correctness of a chunk of text in terms of spelling.
     * 
     * if print is true(which by default is false), the stats would be printed out.
     * 
     * the returned dictionary would have the structure as follows:\n
     * 
     * ```javascript
     * 
     * statistics = {
     *
     *     total_words: Number,
     * 
     *     misspelled_num: Number,
     * 
     *     misspelled_words: Array,
     * 
     *     words_in_dictionary: Number,
     * 
     *     // time spent on loading 
     *     // words into the hash table
     *     load_time: Number,
     * 
     *     // time spent on removing useless 
     *     // characters for the analysis
     *     clean_time: Number,
     * 
     *     // time spent on looking up all of the words
     *     runtime: Number
     * ```
     * 
     * @param {Bool} print true if the stats are going to be printed out false otherwise
     */
    check(print=false) {
        
        if (!(this.check_lang(this.language))) {
            return;
        }

        // clean and bucketize
        const clean_time = this.clean();
        const load_time = this.bucketize();

        // get list of words
        const words = this.text.split(' ');

        var statistics = {
            total_words: words.length,
            misspelled_words: [],
            words_in_dictionary: this.words_inDict,
            load_time: load_time,
            clean_time: clean_time
        }

        const start_time = Date.now();
        var wrong = 0;
        for (var word = 0; word < words.length; word++) {
            if (this.ht.lookup(new helper.jsNode(words[word])) === false) {
                // Meaning if the word does not exist
                wrong++;
                statistics.misspelled_words.push(words[word]);
            }
        }
        // Collect statistics
        statistics.runtime = Date.now() - start_time;
        statistics.misspelled_num = wrong;
        statistics.token = '47874587235697124309';
        if (print) {
            this.visualize(statistics);
        }
        return statistics;
    }
}

