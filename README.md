# Food Delivery System API

[API Link](https://jobayer98.github.io/food-delivery-app/)

## Introduction

The Food Delivery System API is a powerful platform that allows users to order food from various restaurants, manage their profiles, and enables restaurant owners to manage their menus. This document provides an overview of the key features and functionalities of the API.

## Features

### User Management
- **Signup:** Users can create new accounts by providing their information.
- **Login:** Registered users can log in using their credentials.
- **Logout:** Users can log out to securely end their session.
- **Reset Password:** Users can reset their passwords if they forget them.
- **Update Dashboard:** Users can customize their dashboard settings.

### Food Listings
- **View Available Foods:** Users can see a list of all available food items.
- **Search by Name or Category:** Users can search for specific foods by name or category.
- **Order Food:** Authenticated users can place orders for their desired items.

### User Reviews
- **Add Review:** Authenticated users can add reviews for food items.
- **Update Review:** Users can update their reviews if needed.
- **Delete Review:** Users can delete their reviews.

### Restaurant Owner (Super User) Features
- **Open a Restaurant:** Super users can open their restaurants on the platform.
- **Manage Menu:** Restaurant owners can add, update, and remove food items from their menus.

## API Endpoints 

  - /api/v1/auth:  ->Authentication and user registration (/signup, /signin, /logout).
  - /api/v1//checkout/place-order  ->Create a new order
  - /api/v1/order-tracking  ->Track the order
  - /api/v1/restaurants  ->Show all available restaurant name
  - /api/v1/restaurants/:id  ->Show specefic restaurant menus
  - /api/v1/menus  ->Show all available menu
  - /api/v1/menus/:menuId  ->Show a menu item
  - /api/v1/restaurant  ->Create a new Restaurant
  - /api/v1/restaurant/dashboard  ->Read, Update and Close a Restaurant.
  - /api/v1/restaurant/dashboard/menus  ->Show all restaurant owner menu
  - /api/v1/restaurant/dashboard/menu  ->Create a Menu
  - /api/v1/restaurant/dashboard/menus/:menuId  ->Update and Delete menu
  - /api/v1/menu/:menuId/review  ->Give a review
  - /api/v1/menu/:menuId/review/:reviewId  ->Update and Delete Review


## Technologies Used

- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for JWT-based authentication
- redis for server side caching

## Installation
  ```bash
  install dependency npm i
  npm start
  npm run dev
  ```

## Author

This project was created by [Jobayer Rahman](https://github.com/Jobayer98).

Connect with me on:
- GitHub: [@Jobayer98](https://github.com/Jobayer98)
- LinkedIn: [Jobayer Rahman](https://www.linkedin.com/in/jobayer-rahman-5b0860184/)
