Assignment :: SQL Book Form Update
Assignment Details
https://github.com/LukeSchlangen/phi-pg-module-intro
Node SQL Form Update
Expand upon the form and database from lecture.

Get code from Github
NOTE: If you have the code from lecture, just start from there.

Download the zipped code from Github (link above). Or fork and then clone it.
Run npm install to bring in all the node modules needed.
Run the database.sql code in Postico in order to create the books table. It is expecting to be inside of a database called phi.
Alter the books table
Run the following query in Postico to add two new columns to our books table.

   ALTER TABLE books
      ADD  COLUMN edition int,
      ADD COLUMN  publisher varchar(120);
Tasks
Update our HTML form to capture those new fields.
Update our server-side database queries to use them for insertion.
Then update our AJAX GET request to append all of our information to the DOM when it returns successfully so we can see the data from our database.
