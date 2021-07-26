/* global db print */
/* eslint no-restricted-globals: "off" */
db.issues.remove({});
db.deleted_issues.remove({});
const issuesDB = [{
  id: 1,
  status: 'New',
  owner: 'Adithya',
  effort: 10,
  created: new Date('2021-06-23'),
  due: undefined,
  title: 'Error when clicking ADD',
  description: 'Steps to recreate the problem:'
+ '\n1. Refresh the browser.'
+ '\n2. Select "New" in the filter'
+ '\n3. Refresh the browser again. Note the warning in the console:'
+ '\n Warning: Hash history cannot PUSH the same path; a new entry'
+ '\n will not be added to the history stack'
+ '\n4. Click on Add.'
+ '\n5. There is an error in console, and add doesn\'t work.',
},
{
  id: 2,
  status: 'Assigned',
  owner: 'Anirudh',
  effort: 12,
  created: new Date('2021-06-23'),
  due: new Date('2021-06-30'),
  title: 'Missing bottom border',
  description: 'There needs to be a border in the bottom in the panel'
+ ' that appears when clicking on Add',
},
];
db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');
db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });
db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
db.issues.createIndex({ title: 'text', description: 'text' });
db.deleted_issues.createIndex({ id: 1 }, { unique: true });