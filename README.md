# bulk_whatsApp_sender
Library used:-<br />
Puppeteer<br />
Ref. link:- https://pptr.dev/<br />
<br />
In Order to use this Bulk Message sender from your command line, these are prequesit<br />
1.) Must have node environment<br />
2.) npm is must<br />
3.) Brave browser/Chrome browser<br />
<br />
Steps to setup:-<br />
1.) Download files <br />
2.) In case you are using chrome browser just channgs executablePath of browser to google-chrome<br />
3.) ExecutablePath for browser in Linux can be find by using "which google-chrome" in cmd and directly searched in Windows using properties<br />
4.) Set up dependencies by using "npm install --save" in terminal<br />
5.) run on cmdL : chmod +x sender.js<br />
6.) run on cmdL : npm link or npm link sender.js<br />
<br />
Steps to use:-<br />
1.) Write w-app -help to see all features<br />
<pre>
Format                :- w-app -cmd [Message] -c [Contact list must be seperated by space]
-m [Message]          :- To send message to given contacts
-g [Topic]            :- To send gif to given contacts
-r [Emoji]            :- To give reactions using emoji to given contacts
-w [Ocassion]         :- To send greeting wishes to given contacts
-help                 :- show help
</pre>
2.) Use different features according to requirement and save time<br />
