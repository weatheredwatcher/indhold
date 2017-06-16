<?php

/**
* Custom Traits
*
*/

//Points Traits

//Auth Traits
namespace CustomTraits;

trait ApplicationVersion {

    public static function get()
    {
        $commitHash = trim(exec('git log --pretty="%h" -n1 HEAD'));

        $commitDate = new \DateTime(trim(exec('git log -n1 --pretty=%ci HEAD')));
        $commitDate->setTimezone(new \DateTimeZone('UTC'));

        return sprintf('%s (%s)', $commitHash, $commitDate->format('Y-m-d H:m:s'));
    }
}

// Usage: echo 'MyApplication ' . ApplicationVersion::get();

// MyApplication v1.2.3-dev.474a1d0 (2016-11-02 14:11:22)
