export default () => ({
	mongo_url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@benjs-cluster.udh1t.mongodb.net/hive?retryWrites=true&w=majority`,
});
