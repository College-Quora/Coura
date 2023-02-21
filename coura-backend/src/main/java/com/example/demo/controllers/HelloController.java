package com.example.demo.controllers;

import com.example.demo.entity.*;
import com.example.demo.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;

@Controller
@RequestMapping(path = "/demo")
public class HelloController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping(path = "/hello")
    public @ResponseBody String hello() {
        return "Hello, World!";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Blog> index() {
        return blogRepository.findAll();
    }

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewBlog(@RequestParam String title,
            @RequestParam String content) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("Title = " + title);
        Blog n = new Blog();
        // n.setId(id)
        n.setTitle(title);
        n.setContent(content);
        blogRepository.save(n);
        return "Saved";
    }

    // @GetMapping("/blog/{id}")
    // public Blog show(@PathVariable String id) {
    // int blogId = Integer.parseInt(id);
    // return blogRepository.findOne(blogId);
    // }

    // @PostMapping("/blog/search")
    // public List<Blog> search(@RequestBody Map<String, String> body) {
    // String searchTerm = body.get("text");
    // return blogRepository.findByTitleContainingOrContentContaining(searchTerm,
    // searchTerm);
    // }

    // @PostMapping("/blog")
    // public Blog create(@RequestBody Map<String, String> body) {
    // String title = body.get("title");
    // String content = body.get("content");
    // return blogRepository.save(new Blog(title, content));
    // }

    // @PutMapping("/blog/{id}")
    // public Blog update(@PathVariable String id, @RequestBody Map<String, String>
    // body) {
    // int blogId = Integer.parseInt(id);
    // // getting blog
    // Blog blog = blogRepository.findOne(blogId);
    // blog.setTitle(body.get("title"));
    // blog.setContent(body.get("content"));
    // return blogRepository.save(blog);
    // }

    // @DeleteMapping("blog/{id}")
    // public boolean delete(@PathVariable String id) {
    // int blogId = Integer.parseInt(id);
    // blogRepository.delete(blogId);
    // return true;
    // }

}
