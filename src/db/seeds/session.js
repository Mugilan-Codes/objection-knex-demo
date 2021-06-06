export const seed = (knex) => {
  // Deletes ALL existing entries
  return knex('post')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        { title: 'Post 1', body: 'This is body for the Post 1' },
        { title: 'Post 2', body: 'This is body for the Post 2' },
        { title: 'Post 3', body: 'This is body for the Post 3' },
        { title: 'Post 4', body: 'This is body for the Post 4' },
        { title: 'Post 5', body: 'This is body for the Post 5' },
      ]);
    });
};
