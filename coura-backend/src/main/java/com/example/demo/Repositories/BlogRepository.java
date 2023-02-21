package com.example.demo.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.*;

public interface BlogRepository extends CrudRepository<Blog, Integer> {

    // // custom query to search to blog post by title or content
    // List<Blog> findByTitleContainingOrContentContaining(String text, String
    // textAgain);
}