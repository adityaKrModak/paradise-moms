"use client";
import { useState } from "react";
import type React from "react";
import {
  useGetReviewsQuery,
  useRemoveReviewMutation,
  GetReviewsDocument,
  useCreateReviewMutation,
} from "@/graphql/generated/graphql";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Star,
  MessageSquare,
  Package,
  Loader2,
  Trash2,
} from "lucide-react";

export default function ReviewsPage() {
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data, loading, error } = useGetReviewsQuery();
  const [removeReview, { loading: removeLoading }] = useRemoveReviewMutation({
    refetchQueries: [{ query: GetReviewsDocument }],
  });
  const [createReview, { loading: createLoading }] = useCreateReviewMutation({
    refetchQueries: [{ query: GetReviewsDocument }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !rating) {
      alert("Product ID and rating are required.");
      return;
    }

    try {
      await createReview({
        variables: {
          createReviewInput: {
            productId: parseInt(productId),
            rating: rating,
            comment,
          },
        },
      });
      alert("Review added successfully");
      setProductId("");
      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);
      alert(
        `Failed to add review: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await removeReview({ variables: { id } });
        alert("Review deleted successfully");
      } catch (err) {
        console.error(err);
        alert(
          `Failed to delete review: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-orange-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Reviews</h1>
          <p className="text-gray-600 mt-2">
            Manage customer reviews and feedback
          </p>
        </div>
      </div>

      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList className="bg-green-50">
          <TabsTrigger
            value="manage"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Manage Reviews
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="productId"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Package className="h-4 w-4 text-green-600" />
                    Product ID *
                  </Label>
                  <Input
                    id="productId"
                    type="number"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter product ID"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="rating"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Star className="h-4 w-4 text-orange-500" />
                    Rating *
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="rating"
                      type="number"
                      value={rating}
                      onChange={(e) =>
                        setRating(Number.parseInt(e.target.value))
                      }
                      className="w-20 border-green-200 focus:border-green-500 focus:ring-green-500"
                      min="1"
                      max="5"
                      required
                    />
                    <div className="flex gap-1">{renderStars(rating)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="comment"
                    className="text-sm font-medium text-gray-700"
                  >
                    Comment
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter review comment"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={createLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {createLoading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Adding Review...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Review
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              )}
              {error && <p className="text-red-500">{error.message}</p>}
              <div className="space-y-4">
                {data?.reviews.map((review) => (
                  <Card key={review.id} className="border-green-100 relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4">
                          <Image
                            src={
                              review.product.imageUrls[0]?.url ||
                              "/placeholder.svg"
                            }
                            alt={review.product.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {review.product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              by {review.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="flex gap-1 mb-1 justify-end">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm pl-20">
                        {review.comment}
                      </p>
                    </CardContent>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(review.id)}
                      disabled={removeLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
