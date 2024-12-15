package com.app.backend.Mapper;

import org.apache.ibatis.annotations.*;
import org.apache.ibatis.annotations.Mapper;

import com.app.backend.Entity.JoinEntity;

@Mapper
public interface UserMapper {

    @Insert("insert into cust_info (id, password, nickname, email, role, gender, age , auth_path) values (#{id}, #{password}, #{nickname}, #{email} , #{role}, #{gender} , #{age}, #{auth_path})")
    int insert(JoinEntity userEntity);

//  id 로 pw 가져오기
    @Select("SELECT password FROM cust_info WHERE id =#{id}")
    String getId(String id);

}
