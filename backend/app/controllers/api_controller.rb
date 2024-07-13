class ApiController < ApplicationController
  def genres
    @genres = CombinedData.all
    render json: @genres
  end
  def words
    @genres = CombinedData.all
    render json: @genres
  end
  def questions
    @genres = CombinedData.all
    render json: @genres 
  end
  def show
    @genres = CombinedData.all
    render json: @genres 
  end
end
