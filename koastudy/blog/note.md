 ### 联表查询 Population  
 用简短的话来概括Population的使用：在一个Collection(articles)中定义一个指向另一个Collection(users)的_id字段的字段(by)
 - `populate('author')` 返回所有值
 - `populate('author', 'name')` 返回单个值
 - `populate('author', 'name age')` 返回多个值
 - `populate('author', 'name -_id')` 不返回某些值，键名前加`-`
 - 还可以对返回的关联表的数据进行一些处理：
 ```
 查询age小于等于21，只显示name字段，且最多5条数据。
populate({   
  path: 'author',   
  match: { age: { $gte: 21 }},   
  select: 'name',   
  options: { limit: 5 }   
})
 ```
 ### 虚拟属性
 
 