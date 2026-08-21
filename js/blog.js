(function () {
  'use strict';

  var listingEl = document.querySelector('#blog-listing');

  function getInitial(name) {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  function renderBlogCard(post) {
    var a = document.createElement('a');
    a.className = 'blog-card';
    a.href = 'blogs/blog_details.html?slug=' + post.slug;

    a.innerHTML =
      '<div class="blog-card__image">' +
        '<img src="' + post.coverImage + '" alt="' + post.title + '" style="width:100%;height:100%;object-fit:cover" loading="lazy" />' +
        '<div class="blog-card__image-overlay"></div>' +
      '</div>' +
      '<div class="blog-card__body">' +
        '<div class="blog-card__date">' + post.date + '</div>' +
        '<h3 class="blog-card__title">' + post.title + '</h3>' +
        '<p class="blog-card__excerpt">' + post.description + '</p>' +
        '<div class="blog-card__author">' +
          '<div class="blog-card__author-avatar" style="display:flex;align-items:center;justify-content:center;color:var(--gray-500);font-size:0.65rem;font-weight:600;">' + getInitial(post.author) + '</div>' +
          '<span class="blog-card__author-name">' + post.author + '</span>' +
        '</div>' +
      '</div>';

    return a;
  }

  function renderYearGroup(year, posts) {
    var wrapper = document.createElement('div');
    wrapper.className = 'blog-year';

    var header = document.createElement('div');
    header.className = 'blog-year__header';
    header.innerHTML =
      '<h2 class="blog-year__title">' + year + '</h2>' +
      '<div class="blog-year__line"></div>' +
      '<span class="blog-year__count">' + posts.length + ' post' + (posts.length !== 1 ? 's' : '') + '</span>';
    wrapper.appendChild(header);

    var grid = document.createElement('div');
    grid.className = 'blog-grid';

    posts.forEach(function (post) {
      grid.appendChild(renderBlogCard(post));
    });

    wrapper.appendChild(grid);
    return wrapper;
  }

  function renderBlogListing(blogs) {
    var grouped = {};
    blogs.forEach(function (post) {
      var year = post.date.split(', ').pop() || 'Unknown';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    var sortedYears = Object.keys(grouped).sort(function (a, b) { return b - a; });

    listingEl.innerHTML = '';
    sortedYears.forEach(function (year) {
      listingEl.appendChild(renderYearGroup(year, grouped[year]));
    });
  }

  function showLoading() {
    listingEl.innerHTML =
      '<div class="blog-loading" style="text-align:center;padding:4rem 0;color:var(--gray-500);font-size:1.125rem;">' +
        '<div style="display:inline-block;width:2rem;height:2rem;border:3px solid var(--gray-200);border-top-color:var(--lake-blue);border-radius:50%;animation:blog-spin 0.8s linear infinite;margin-bottom:1rem;"></div>' +
        '<div>Loading blog posts...</div>' +
      '</div>';
  }

  function showError(title, message) {
    listingEl.innerHTML =
      '<div class="blog-error">' +
        '<div class="blog-error__title">' + title + '</div>' +
        '<p class="blog-error__desc">' + message + '</p>' +
      '</div>';
  }

  function loadBlogListing() {
    showLoading();

    fetch('data/blogs.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load blogs (HTTP ' + res.status + ')');
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.blogs) || data.blogs.length === 0) {
          showError('No blog posts found', 'Check back later for new content.');
          return;
        }
        renderBlogListing(data.blogs);
      })
      .catch(function (err) {
        showError('Something went wrong', 'Could not load blog posts. Please try again later.');
        console.error('Blog load error:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogListing);
  } else {
    loadBlogListing();
  }
})();
