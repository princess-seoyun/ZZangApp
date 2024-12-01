package com.app.backend.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.app.backend.Entity.UserEntity;

@Mapper
public interface UserMapper {

    @Insert("insert into cust_info (id, password, name, email) values (#{id}, #{password}, #{name}, #{email})")
    public int insert(UserEntity userEntity);

}
