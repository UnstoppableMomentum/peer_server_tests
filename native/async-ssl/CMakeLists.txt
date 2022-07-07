###############################
#                             #
# Copyright (c) 2022 Selenika #
#                             #
###############################

cmake_minimum_required(VERSION 3.10)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(Boost_USE_STATIC_LIBS ON)

add_definitions(-DDEBUG)

# set the project name
project(selenika-peer-server-test-client)

include_directories(${CMAKE_SOURCE_DIR})

find_package(Boost 1.77.0 COMPONENTS log regex program_options thread system REQUIRED)
find_package(OpenSSL)
find_package(Threads REQUIRED)

# add the executable
add_executable(${CMAKE_PROJECT_NAME}
        main.cpp
        )

target_link_libraries(${CMAKE_PROJECT_NAME} ${OPENSSL_LIBRARIES} -static-libgcc -static-libstdc++)
target_link_libraries(${CMAKE_PROJECT_NAME} ${Boost_LIBRARIES} -static-libgcc -static-libstdc++)
target_link_libraries(${CMAKE_PROJECT_NAME} ${CMAKE_THREAD_LIBS_INIT} -static-libgcc -static-libstdc++)
