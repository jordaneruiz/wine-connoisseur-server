const { MongoClient } = require('mongodb');



async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function main(){

  let MONGODB_URL =  process.env.MONGODB_URL || `mongodb+srv://jordaneruiz:${encodedPassword}@wine-db.opy3phj.mongodb.net/`
    console.log(`MONGODB_URL: "${MONGODB_URL}"`)

    const client = new MongoClient(MONGODB_URL);

    try {
      await client.connect();
      await listDatabases(client);


    } catch (e) {
      console.error(e);
  }

}

main().catch(console.error);