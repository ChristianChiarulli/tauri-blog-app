"use client";

import React, { useEffect, useState } from "react";

import { TAGS } from "~/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
};

export default function PostTags({ selectedTag, setSelectedTag }: Props) {
  const handleValueChange = (newTag: string) => {
    setSelectedTag(newTag);
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select tag" />
      </SelectTrigger>
      <SelectContent>
        {["all", ...TAGS].map((tag: string) => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
