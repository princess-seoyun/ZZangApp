package com.app.backend.Mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.app.backend.DTO.UserDto;
import com.app.backend.Entity.UserEntity;

@Mapper
public interface UserMapper {

    @Insert("insert into cust_info (id, pw, name, email) values (#{id}, #{password}, #{name}, #{email})")
    public UserEntity insert(UserDto userDto);

}
